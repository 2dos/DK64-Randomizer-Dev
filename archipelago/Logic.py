"""Contains the class which holds logic variables, and the master copy of regions."""

from math import ceil
from functools import lru_cache
from collections import Counter
from typing import List
from BaseClasses import CollectionState

import randomizer.CollectibleLogicFiles.AngryAztec
import randomizer.CollectibleLogicFiles.CreepyCastle
import randomizer.CollectibleLogicFiles.CrystalCaves
import randomizer.CollectibleLogicFiles.DKIsles
import randomizer.CollectibleLogicFiles.FranticFactory
import randomizer.CollectibleLogicFiles.FungiForest
import randomizer.CollectibleLogicFiles.GloomyGalleon
import randomizer.CollectibleLogicFiles.JungleJapes
import randomizer.LogicFiles.AngryAztec
import randomizer.LogicFiles.CreepyCastle
import randomizer.LogicFiles.CrystalCaves
import randomizer.LogicFiles.DKIsles
import randomizer.LogicFiles.FranticFactory
import randomizer.LogicFiles.FungiForest
import randomizer.LogicFiles.GloomyGalleon
import randomizer.LogicFiles.HideoutHelm
import randomizer.LogicFiles.JungleJapes
import randomizer.LogicFiles.Shops
from randomizer.Enums.Collectibles import Collectibles
from randomizer.Enums.Events import Events
from randomizer.Enums.Items import Items
from randomizer.Enums.Kongs import Kongs
from randomizer.Enums.Levels import Levels
from randomizer.Enums.Locations import Locations
from randomizer.Enums.Regions import Regions as RegionEnum
from randomizer.Enums.Switches import Switches
from randomizer.Enums.SwitchTypes import SwitchType
from randomizer.Enums.Settings import (
    ActivateAllBananaports,
    BananaportRando,
    ClimbingStatus,
    DamageAmount,
    FasterChecksSelected,
    GalleonWaterSetting,
    GlitchesSelected,
    HardModeSelected,
    HardBossesSelected,
    LogicType,
    MiscChangesSelected,
    ProgressiveHintItem,
    RemovedBarriersSelected,
    ShockwaveStatus,
    ShuffleLoadingZones,
    TrainingBarrels,
    HelmSetting,
    KongModels,
    SlamRequirement,
    WinConditionComplex,
)
from randomizer.Enums.VendorType import VendorType
from randomizer.Enums.Time import Time
from randomizer.Enums.Types import Types, BarrierItems
from randomizer.Lists.Item import ItemList
from randomizer.Enums.Maps import Maps
from randomizer.Lists.Warps import BananaportVanilla
from randomizer.Patching.Library.Generic import IsItemSelected, getProgHintBarrierItem
from randomizer.Prices import AnyKongCanBuy, CanBuy
from archipelago.Items import DK64Item

STARTING_SLAM = 0  # Currently we're assuming you always start with 1 slam
logic_item_name_to_id = {}
for id, item in ItemList.items():
    logic_item_name_to_id[item.name] = id


def IsGlitchEnabled(settings, glitch_enum):
    """Check if glitch is enabled in the settings."""
    return len(settings.glitches_selected) == 0 or glitch_enum in settings.glitches_selected


class LogicVarHolder:
    """Used to store variables when checking logic conditions."""

    def __init__(self, spoiler, player):
        """Initialize with given parameters."""
        settings = spoiler.settings
        self.settings = settings
        self.spoiler = spoiler
        self.ap_player = player

        # We never need to make these assumptions in Archipelago
        # # Some restrictions are added to the item placement fill for the sake of reducing indirect errors. We can overlook these restrictions once we know the fill is valid.
        self.assumeFillSuccess = False
        # # See CalculateWothPaths method for details on these assumptions
        self.assumePaidBLockers = False
        self.assumeAztecEntry = False
        self.assumeLevel4Entry = False
        self.assumeLevel8Entry = False
        self.assumeUpperIslesAccess = False
        self.assumeKRoolAccess = False

        # One Archipelago-specific exception - assuming infinite coins shortcuts a few price-related functions that we don't care about
        # In Archipelago, shops are free cause we're not tackling coin logic yet
        self.assumeInfiniteCoins = True

        # Archipelago really wants the number of locations to match the number of items. Keep track of how many locations we've made here
        self.location_pool_size = 0

        self.startkong = self.settings.starting_kong
        # Glitch Logic
        enable_glitch_logic = self.settings.logic_type == LogicType.glitch
        self.phasewalk = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.phase_walking)
        self.phaseswim = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.phase_swimming)
        self.moonkicks = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.moonkicks)
        self.ledgeclip = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.ledge_clips)
        self.generalclips = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.general_clips)  # General clips which have no real category
        self.lanky_blocker_skip = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.b_locker_skips)  # Also includes ppunch skip
        self.dk_blocker_skip = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.b_locker_skips)
        self.troff_skip = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.troff_n_scoff_skips)
        self.spawn_snags = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.spawn_snags)
        self.advanced_platforming = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.advanced_platforming)
        self.tbs = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.tag_barrel_storage) and not self.settings.disable_tag_barrels
        self.swim_through_shores = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.swim_through_shores)
        self.boulder_clip = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.boulder_clips) and False  # Temporarily disabled
        self.skew = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.skew)
        self.moontail = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.moontail)
        self.phasefall = enable_glitch_logic and IsGlitchEnabled(settings, GlitchesSelected.phasefall)
        # Reset
        self.Reset()

    def Reset(self):
        """Reset all logic variables.

        Done between reachability searches and upon initialization.
        """
        self.latest_owned_items = []
        self.found_test_item = False

        self.donkey = Kongs.donkey in self.settings.starting_kong_list
        self.diddy = Kongs.diddy in self.settings.starting_kong_list
        self.lanky = Kongs.lanky in self.settings.starting_kong_list
        self.tiny = Kongs.tiny in self.settings.starting_kong_list
        self.chunky = Kongs.chunky in self.settings.starting_kong_list

        # In Archipelago, we have to assume tag anywhere is on because it would be too complex to parse the world state otherwise
        self.isdonkey = self.donkey
        self.isdiddy = self.diddy
        self.islanky = self.lanky
        self.istiny = self.tiny
        self.ischunky = self.chunky

        # Right now assuming start with training barrels
        self.vines = self.settings.training_barrels == TrainingBarrels.normal
        self.swim = self.settings.training_barrels == TrainingBarrels.normal
        self.oranges = self.settings.training_barrels == TrainingBarrels.normal
        self.barrels = self.settings.training_barrels == TrainingBarrels.normal
        self.climbing = self.settings.climbing_status == ClimbingStatus.normal
        self.can_use_vines = self.vines  # and self.climbing to restore old behavior

        progDonkey = 0
        self.blast = False
        self.strongKong = False
        self.grab = False

        progDiddy = 0
        self.charge = False
        self.jetpack = False
        self.spring = False

        progLanky = 0
        self.handstand = False
        self.balloon = False
        self.sprint = False

        progTiny = 0
        self.mini = False
        self.twirl = False
        self.monkeyport = False

        progChunky = 0
        self.hunkyChunky = False
        self.punch = False
        self.gorillaGone = False

        self.coconut = False
        self.peanut = False
        self.grape = False
        self.feather = False
        self.pineapple = False

        self.bongos = False
        self.guitar = False
        self.trombone = False
        self.saxophone = False
        self.triangle = False

        self.nintendoCoin = False
        self.rarewareCoin = False

        self.camera = self.settings.shockwave_status == ShockwaveStatus.start_with
        self.shockwave = self.settings.shockwave_status == ShockwaveStatus.start_with

        self.scope = False
        self.homing = False

        self.JapesKey = False
        self.AztecKey = False
        self.FactoryKey = False
        self.GalleonKey = False
        self.ForestKey = False
        self.CavesKey = False
        self.CastleKey = False
        self.HelmKey = False

        # AP adjustment: we have to handle shopkeeper access on init if they aren't in the pool because they won't get placed in a convenient spot
        self.crankyAccess = Types.Cranky not in self.settings.shuffled_location_types
        self.funkyAccess = Types.Funky not in self.settings.shuffled_location_types
        self.candyAccess = Types.Candy not in self.settings.shuffled_location_types
        self.snideAccess = Types.Snide not in self.settings.shuffled_location_types

        self.HelmDonkey1 = False
        self.HelmDonkey2 = False
        self.HelmDiddy1 = False
        self.HelmDiddy2 = False
        self.HelmLanky1 = False
        self.HelmLanky2 = False
        self.HelmTiny1 = False
        self.HelmTiny2 = False
        self.HelmChunky1 = False
        self.HelmChunky2 = False

        self.allTrainingChecks = self.settings.fast_start_beginning_of_game

        self.Slam = STARTING_SLAM
        self.AmmoBelts = 0
        self.InstUpgrades = 0
        self.Melons = 0

        self.GoldenBananas = 0
        self.BananaFairies = 0
        self.BananaMedals = 0
        self.BattleCrowns = 0
        self.Beans = 0
        self.Pearls = 0

        self.superSlam = False
        self.superDuperSlam = False

        self.Blueprints = []

        self.Events = []
        # Galleon water needs slightly more care to account for the initial state of Galleon water
        # dk64randomizer.com handles this with Events in Galleon, but AP needs a solution that doesn't litter event locations in the world
        if self.settings.galleon_water_internal == GalleonWaterSetting.lowered:
            self.AddEvent(Events.WaterLowered)
        if self.settings.galleon_water_internal == GalleonWaterSetting.raised:
            self.AddEvent(Events.WaterRaised)

        self.Hints = []

        # SpecialLocationsReached are only utilized for warp events for TA purposes, and can be therefore bypassed in Archipelago
        self.SpecialLocationsReached = [Locations.AztecDonkeyQuicksandCave, Locations.CavesTinyCaveBarrel, Locations.GalleonDiddyGoldTower, Locations.JapesDiddyMountain]

        # Set key events for keys which are given to the player at start of game
        keyEvents = [
            Events.JapesKeyTurnedIn,
            Events.AztecKeyTurnedIn,
            Events.FactoryKeyTurnedIn,
            Events.GalleonKeyTurnedIn,
            Events.ForestKeyTurnedIn,
            Events.CavesKeyTurnedIn,
            Events.CastleKeyTurnedIn,
            Events.HelmKeyTurnedIn,
        ]
        for keyEvent in keyEvents:
            if keyEvent not in self.settings.krool_keys_required:
                # This is horrifyingly bad to go keys -> events -> keys but the patcher is expecting events in krool_keys_required and I'm not touching the math there to fix it
                if keyEvent == Events.JapesKeyTurnedIn:
                    self.JapesKey = True
                elif keyEvent == Events.AztecKeyTurnedIn:
                    self.AztecKey = True
                elif keyEvent == Events.FactoryKeyTurnedIn:
                    self.FactoryKey = True
                elif keyEvent == Events.GalleonKeyTurnedIn:
                    self.GalleonKey = True
                elif keyEvent == Events.ForestKeyTurnedIn:
                    self.ForestKey = True
                elif keyEvent == Events.CavesKeyTurnedIn:
                    self.CavesKey = True
                elif keyEvent == Events.CastleKeyTurnedIn:
                    self.CastleKey = True
                elif keyEvent == Events.HelmKeyTurnedIn:
                    self.HelmKey = True

        activated_warp_maps = []
        if self.settings.activate_all_bananaports == ActivateAllBananaports.all:
            activated_warp_maps = [
                Maps.JungleJapes,
                Maps.AngryAztec,
                Maps.AztecLlamaTemple,
                Maps.FranticFactory,
                Maps.GloomyGalleon,
                Maps.FungiForest,
                Maps.CrystalCaves,
                Maps.CreepyCastle,
                Maps.CastleCrypt,
                Maps.Isles,
            ]
        elif self.settings.activate_all_bananaports == ActivateAllBananaports.isles:
            activated_warp_maps = [Maps.Isles]
        if any(activated_warp_maps):
            for warp_data in BananaportVanilla.values():
                if warp_data.map_id in activated_warp_maps:
                    self.Events.append(warp_data.event)

        # Colored banana and coin arrays
        # Colored bananas as 9 arrays of 5 (8 levels for 5 kongs, Helm is level index 7, so skip this)
        self.ColoredBananas = []
        for i in range(9):
            self.ColoredBananas.append([0] * 5)

        self.Coins = [0] * 5
        self.RegularCoins = [0] * 5
        self.RainbowCoins = 0
        self.SpentCoins = [0] * 5

        self.kong = self.startkong

        self.bananaHoard = False

    def isPriorHelmComplete(self, kong: Kongs):
        """Determine if there is access to the kong's helm room."""
        if self.settings.helm_setting == HelmSetting.skip_all or Events.HelmFinished in self.Events:
            return True
        room_seq = (Kongs.donkey, Kongs.chunky, Kongs.tiny, Kongs.lanky, Kongs.diddy)
        kong_evt = (
            Events.HelmDonkeyDone,
            Events.HelmDiddyDone,
            Events.HelmLankyDone,
            Events.HelmTinyDone,
            Events.HelmChunkyDone,
        )
        desired_index = room_seq.index(kong)
        helm_order = self.settings.helm_order
        if desired_index in helm_order:
            sequence_slot = helm_order.index(desired_index)
            if sequence_slot > 0:
                prior_kong = room_seq[helm_order[sequence_slot - 1]]
                return kong_evt[prior_kong] in self.Events
        return True

    def UpdateCoins(self):
        """Update coin total."""
        for x in range(5):
            self.Coins[x] = (self.RegularCoins[x] + (5 * self.RainbowCoins)) - self.SpentCoins[x]

    def UpdateFromArchipelagoItems(self, collectionState: CollectionState):
        """Update logic variables based on the DK64Items found by Archipelago."""
        self.Reset()
        ownedItems = []
        cbArchItems = []
        eventArchItems = []
        for item_name, item_count in collectionState.prog_items[self.ap_player].items():
            if item_name.startswith("Collectible CBs"):
                for i in range(item_count):
                    cbArchItems.append(item_name)
            elif item_name.startswith("Event, "):
                eventArchItems.append(item_name)
            else:
                corresponding_item_id = logic_item_name_to_id[item_name]
                for i in range(item_count):
                    ownedItems.append(corresponding_item_id)

        # We update Events before updating items because we need to know the status of a few events for some items
        event_list = []
        for item_name in eventArchItems:
            # Event names are carefully named in the following format:
            # index 0: "Event" - needed to identify this as an Event item
            # index 1: the Events enum name as a string
            item_data = item_name.split(", ")
            event = Events[item_data[1]]
            event_list.append(event)
        self.Events = event_list

        self.Update(ownedItems)

        # We update CBs after updating items because we need to know if we have each Kong
        colored_banana_counts = [[0] * 5 for _ in range(9)]
        for item_name in cbArchItems:
            # CBs are carefully named in the following format:
            # index 0: "Collectible CBs" - needed to identify this as a collectible item
            # index 1: the Kong's name, matching the Kongs enum
            # index 2: the level's name, matching the Levels enum
            # index 3: the quantity of CBs (as a string!)
            item_data = item_name.split(", ")
            kong = Kongs[item_data[1]]
            level = Levels[item_data[2]]
            quantity = int(item_data[3])
            colored_banana_counts[level][kong] += quantity
        self.ColoredBananas = colored_banana_counts

    def AddArchipelagoItem(self, ap_item):
        """Add an Archipelago item to the owned items list."""
        ownedItems = self.latest_owned_items.copy()  # Start with the current owned items list
        if ap_item.name.startswith("Collectible CBs"):
            # CBs are carefully named in the following format:
            # index 0: "Collectible CBs" - needed to identify this as a collectible item
            # index 1: the Kong's name, matching the Kongs enum
            # index 2: the level's name, matching the Levels enum
            # index 3: the quantity of CBs (as a string!)
            item_data = ap_item.name.split(", ")
            kong = Kongs[item_data[1]]
            level = Levels[item_data[2]]
            quantity = int(item_data[3])
            self.ColoredBananas[level][kong] += quantity
        elif ap_item.name.startswith("Event, "):
            # Event names are carefully named in the following format:
            # index 0: "Event" - needed to identify this as an Event item
            # index 1: the Events enum name as a string
            item_data = ap_item.name.split(", ")
            event = Events[item_data[1]]
            self.AddEvent(event)
        else:
            corresponding_item_id = logic_item_name_to_id[ap_item.name]
            ownedItems.append(corresponding_item_id)

        self.Update(ownedItems)

    def RemoveArchipelagoItem(self, ap_item):
        """Add an Archipelago item to the owned items list."""
        ownedItems = self.latest_owned_items.copy()  # Start with the current owned items list
        if ap_item.name.startswith("Collectible CBs"):
            # CBs are carefully named in the following format:
            # index 0: "Collectible CBs" - needed to identify this as a collectible item
            # index 1: the Kong's name, matching the Kongs enum
            # index 2: the level's name, matching the Levels enum
            # index 3: the quantity of CBs (as a string!)
            item_data = ap_item.name.split(", ")
            kong = Kongs[item_data[1]]
            level = Levels[item_data[2]]
            quantity = int(item_data[3])
            self.ColoredBananas[level][kong] -= quantity
        elif ap_item.name.startswith("Event, "):
            # Event names are carefully named in the following format:
            # index 0: "Event" - needed to identify this as an Event item
            # index 1: the Events enum name as a string
            item_data = ap_item.name.split(", ")
            event = Events[item_data[1]]
            self.Events = [evt for evt in self.Events if evt != event]
        else:
            corresponding_item_id = logic_item_name_to_id[ap_item.name]
            if corresponding_item_id in ownedItems:
                ownedItems.remove(corresponding_item_id)

        self.Update(ownedItems)

    def Update(self, ownedItems):
        """Update logic variables based on owned items."""
        # Except for banned items - these items aren't allowed to be used by the logic
        ownedItems = [item for item in ownedItems]
        item_counts = Counter(ownedItems)

        self.latest_owned_items = ownedItems
        self.found_test_item = self.found_test_item or Items.TestItem in ownedItems

        self.donkey = self.donkey or Items.Donkey in ownedItems or self.startkong == Kongs.donkey
        self.diddy = self.diddy or Items.Diddy in ownedItems or self.startkong == Kongs.diddy
        self.lanky = self.lanky or Items.Lanky in ownedItems or self.startkong == Kongs.lanky
        self.tiny = self.tiny or Items.Tiny in ownedItems or self.startkong == Kongs.tiny
        self.chunky = self.chunky or Items.Chunky in ownedItems or self.startkong == Kongs.chunky

        # In Archipelago, we have to assume tag anywhere is on because it would be too complex to parse the world state otherwise
        self.isdonkey = self.donkey
        self.isdiddy = self.diddy
        self.islanky = self.lanky
        self.istiny = self.tiny
        self.ischunky = self.chunky

        self.climbing = self.climbing or Items.Climbing in ownedItems
        self.vines = self.vines or Items.Vines in ownedItems
        self.swim = self.swim or Items.Swim in ownedItems
        self.oranges = self.oranges or Items.Oranges in ownedItems
        self.barrels = self.barrels or Items.Barrels in ownedItems
        self.can_use_vines = self.vines  # and self.climbing to restore old behavior

        progDonkey = item_counts[Items.ProgressiveDonkeyPotion]
        self.blast = self.blast or (Items.BaboonBlast in ownedItems or progDonkey >= 1) and self.donkey
        self.strongKong = self.strongKong or (Items.StrongKong in ownedItems or progDonkey >= 2) and self.donkey
        self.grab = self.grab or (Items.GorillaGrab in ownedItems or progDonkey >= 3) and self.donkey

        progDiddy = item_counts[Items.ProgressiveDiddyPotion]
        self.charge = self.charge or (Items.ChimpyCharge in ownedItems or progDiddy >= 1) and self.diddy
        self.jetpack = self.jetpack or (Items.RocketbarrelBoost in ownedItems or progDiddy >= 2) and self.diddy
        self.spring = self.spring or (Items.SimianSpring in ownedItems or progDiddy >= 3) and self.diddy

        progLanky = item_counts[Items.ProgressiveLankyPotion]
        self.handstand = self.handstand or (Items.Orangstand in ownedItems or progLanky >= 1) and self.lanky
        self.balloon = self.balloon or (Items.BaboonBalloon in ownedItems or progLanky >= 2) and self.lanky
        self.sprint = self.sprint or (Items.OrangstandSprint in ownedItems or progLanky >= 3) and self.lanky

        progTiny = item_counts[Items.ProgressiveTinyPotion]
        self.mini = self.mini or (Items.MiniMonkey in ownedItems or progTiny >= 1) and self.tiny
        self.twirl = self.twirl or (Items.PonyTailTwirl in ownedItems or progTiny >= 2) and self.tiny
        self.monkeyport = self.monkeyport or (Items.Monkeyport in ownedItems or progTiny >= 3) and self.tiny

        progChunky = item_counts[Items.ProgressiveChunkyPotion]
        self.hunkyChunky = self.hunkyChunky or (Items.HunkyChunky in ownedItems or progChunky >= 1) and self.chunky
        self.punch = self.punch or (Items.PrimatePunch in ownedItems or progChunky >= 2) and self.chunky
        self.gorillaGone = self.gorillaGone or (Items.GorillaGone in ownedItems or progChunky >= 3) and self.chunky

        self.coconut = self.coconut or Items.Coconut in ownedItems and self.donkey
        self.peanut = self.peanut or Items.Peanut in ownedItems and self.diddy
        self.grape = self.grape or Items.Grape in ownedItems and self.lanky
        self.feather = self.feather or Items.Feather in ownedItems and self.tiny
        self.pineapple = self.pineapple or Items.Pineapple in ownedItems and self.chunky

        self.bongos = self.bongos or Items.Bongos in ownedItems and self.donkey
        self.guitar = self.guitar or Items.Guitar in ownedItems and self.diddy
        self.trombone = self.trombone or Items.Trombone in ownedItems and self.lanky
        self.saxophone = self.saxophone or Items.Saxophone in ownedItems and self.tiny
        self.triangle = self.triangle or Items.Triangle in ownedItems and self.chunky

        self.crankyAccess = self.crankyAccess or Items.Cranky in ownedItems
        self.funkyAccess = self.funkyAccess or Items.Funky in ownedItems
        self.candyAccess = self.candyAccess or Items.Candy in ownedItems
        self.snideAccess = self.snideAccess or Items.Snide in ownedItems

        self.nintendoCoin = self.nintendoCoin or Items.NintendoCoin in ownedItems
        self.rarewareCoin = self.rarewareCoin or Items.RarewareCoin in ownedItems

        self.JapesKey = self.JapesKey or Items.JungleJapesKey in ownedItems
        self.AztecKey = self.AztecKey or Items.AngryAztecKey in ownedItems
        self.FactoryKey = self.FactoryKey or Items.FranticFactoryKey in ownedItems
        self.GalleonKey = self.GalleonKey or Items.GloomyGalleonKey in ownedItems
        self.ForestKey = self.ForestKey or Items.FungiForestKey in ownedItems
        self.CavesKey = self.CavesKey or Items.CrystalCavesKey in ownedItems
        self.CastleKey = self.CastleKey or Items.CreepyCastleKey in ownedItems
        self.HelmKey = self.HelmKey or Items.HideoutHelmKey in ownedItems

        self.HelmDonkey1 = self.HelmDonkey1 or Items.HelmDonkey1 in ownedItems
        self.HelmDonkey2 = self.HelmDonkey2 or Items.HelmDonkey2 in ownedItems
        self.HelmDiddy1 = self.HelmDiddy1 or Items.HelmDiddy1 in ownedItems
        self.HelmDiddy2 = self.HelmDiddy2 or Items.HelmDiddy2 in ownedItems
        self.HelmLanky1 = self.HelmLanky1 or Items.HelmLanky1 in ownedItems
        self.HelmLanky2 = self.HelmLanky2 or Items.HelmLanky2 in ownedItems
        self.HelmTiny1 = self.HelmTiny1 or Items.HelmTiny1 in ownedItems
        self.HelmTiny2 = self.HelmTiny2 or Items.HelmTiny2 in ownedItems
        self.HelmChunky1 = self.HelmChunky1 or Items.HelmChunky1 in ownedItems
        self.HelmChunky2 = self.HelmChunky2 or Items.HelmChunky2 in ownedItems

        has_all = True
        if not self.settings.fast_start_beginning_of_game:
            has_all = all(
                self.spoiler.LocationList[loc].inaccessible or self.spoiler.LocationList[loc].item in ownedItems
                for loc in (
                    Locations.IslesSwimTrainingBarrel,
                    Locations.IslesVinesTrainingBarrel,
                    Locations.IslesBarrelsTrainingBarrel,
                    Locations.IslesOrangesTrainingBarrel,
                )
            )
        self.allTrainingChecks = self.allTrainingChecks or has_all

        self.Slam = item_counts[Items.ProgressiveSlam] + STARTING_SLAM
        self.AmmoBelts = item_counts[Items.ProgressiveAmmoBelt]
        self.InstUpgrades = item_counts[Items.ProgressiveInstrumentUpgrade]
        self.Melons = 1
        if self.bongos or self.guitar or self.trombone or self.saxophone or self.triangle or self.InstUpgrades > 0:
            self.Melons = 2
        if self.InstUpgrades >= 2:
            self.Melons = 3

        self.GoldenBananas = item_counts[Items.GoldenBanana]
        self.BananaFairies = item_counts[Items.BananaFairy]
        self.BananaMedals = item_counts[Items.BananaMedal]
        self.BattleCrowns = item_counts[Items.BattleCrown]
        self.RainbowCoins = item_counts[Items.RainbowCoin]

        self.camera = self.camera or Items.CameraAndShockwave in ownedItems or Items.Camera in ownedItems
        self.shockwave = self.shockwave or Items.CameraAndShockwave in ownedItems or Items.Shockwave in ownedItems

        self.scope = self.scope or Items.SniperSight in ownedItems
        # Having the homing ammo ability also requires having reliable access to homing ammo. This is not a perfect fix, but should cover 99.9% of cases and won't show up in hint paths.
        self.homing = self.homing or (Items.HomingAmmo in ownedItems and (Events.ForestEntered in self.Events or Events.CastleEntered in self.Events or self.assumeFillSuccess))

        self.superSlam = self.Slam >= 2
        self.superDuperSlam = self.Slam >= 3

        self.Blueprints = [x for x in ownedItems if x >= Items.JungleJapesDonkeyBlueprint and x <= Items.DKIslesChunkyBlueprint]
        self.Hints = [x for x in ownedItems if x >= Items.JapesDonkeyHint and x <= Items.CastleChunkyHint]
        self.Beans = sum(1 for x in ownedItems if x == Items.Bean)
        self.Pearls = sum(1 for x in ownedItems if x == Items.Pearl)

        self.UpdateCoins()

        self.bananaHoard = self.bananaHoard or Items.BananaHoard in ownedItems

    def GetCoins(self, kong):
        """Get Coin Total for a kong."""
        # In Archipelago, we will assume infinite coins in all worlds - the only snag *might* be Arcade Round 2, but there is an uninterrupted straight running line from the Arcade to 3 DK coins.
        # self.UpdateCoins()
        return 1000  # self.Coins[kong]

    def CanSlamSwitch(self, level: Levels, default_requirement_level: int):
        """Determine whether the player can operate the necessary slam operation.

        Keyword arguments:
        level -- level which the switch takes place
        default_requirement_level -- Default requirement for the switch without randomization. 1 - Base slam, 2 - Super, 3 - Super Duper.
        """
        slam_req = default_requirement_level
        if self.settings.alter_switch_allocation:
            slam_req = self.settings.switch_allocation[level]
        if slam_req == 2:
            return self.superSlam
        elif slam_req == 3:
            return self.superDuperSlam
        return self.Slam

    @lru_cache(maxsize=None)
    def IsLavaWater(self) -> bool:
        """Determine whether the water is lava water or not."""
        return IsItemSelected(self.settings.hard_mode, self.settings.hard_mode_selected, HardModeSelected.water_is_lava, False)

    @lru_cache(maxsize=None)
    def HardBossesSettingEnabled(self, check: HardBossesSelected) -> bool:
        """Determine whether the hard bosses feature is enabled or not."""
        return IsItemSelected(self.settings.hard_bosses, self.settings.hard_bosses_selected, check, False)

    @lru_cache(maxsize=None)
    def IsHardFallDamage(self) -> bool:
        """Determine whether the lowered fall damage height threshold is enabled or not."""
        return IsItemSelected(self.settings.hard_mode, self.settings.hard_mode_selected, HardModeSelected.reduced_fall_damage_threshold, False)

    def canAccessHelm(self) -> bool:
        """Determine whether the player can access helm whilst the timer is active."""
        if IsItemSelected(self.settings.hard_mode, self.settings.hard_mode_selected, HardModeSelected.strict_helm_timer, False):
            return self.snideAccess and len(self.Blueprints) > (4 + (2 * self.settings.helm_phase_count))
        return self.snideAccess or self.assumeFillSuccess

    @lru_cache(maxsize=None)
    def checkFastCheck(self, check: FasterChecksSelected):
        """Determine whether a fast check is selected."""
        return IsItemSelected(self.settings.faster_checks_enabled, self.settings.faster_checks_selected, check)

    @lru_cache(maxsize=None)
    def checkBarrier(self, check: RemovedBarriersSelected):
        """Determine whether a barrier has been removed by the removed barriers setting."""
        # # This AP-specific exception covers the case where we enter the Worm Area from the wrong side
        if check == RemovedBarriersSelected.forest_green_tunnel and Events.WormGatesOpened in self.Events:
            return True
        return IsItemSelected(self.settings.remove_barriers_enabled, self.settings.remove_barriers_selected, check)

    @lru_cache(maxsize=None)
    def galleonGatesStayOpen(self) -> bool:
        """Determine whether the galleon gates stay open once the instrument is played."""
        return IsItemSelected(
            self.settings.quality_of_life,
            self.settings.misc_changes_selected,
            MiscChangesSelected.remove_galleon_ship_timers,
        )

    @lru_cache(maxsize=None)
    def cabinBarrelMoved(self) -> bool:
        """Determine whether the upper cabin rocketbarrel has been moved."""
        return IsItemSelected(
            self.settings.quality_of_life,
            self.settings.misc_changes_selected,
            MiscChangesSelected.move_spring_cabin_rocketbarrel,
        )

    def canOpenLlamaTemple(self):
        """Determine whether the switches on the Llama Temple can be shot."""
        if not (self.checkBarrier(RemovedBarriersSelected.aztec_llama_switches) or Events.LlamaFreed in self.Events):
            return False
        return self.hasMoveSwitchsanity(Switches.AztecLlamaCoconut) or self.hasMoveSwitchsanity(Switches.AztecLlamaGrape) or self.hasMoveSwitchsanity(Switches.AztecLlamaFeather)

    def canTravelToMechFish(self):
        """Determine whether or not there is a fast enough path to the Mech Fish is open."""
        if self.settings.shuffle_loading_zones != ShuffleLoadingZones.all or self.settings.bananaport_rando == BananaportRando.off:
            return self.swim
        lighthouse_gate = self.checkBarrier(RemovedBarriersSelected.galleon_lighthouse_gate_opened) or self.hasMoveSwitchsanity(Switches.GalleonLighthouse, False)
        shipyard_gate = self.checkBarrier(RemovedBarriersSelected.galleon_shipwreck_gate_opened) or self.hasMoveSwitchsanity(Switches.GalleonShipwreck, False)
        return self.swim and lighthouse_gate and shipyard_gate

    def hasMoveSwitchsanity(
        self,
        switchsanity_setting: Switches,
        kong_needs_current: bool = True,
        level: Levels = Levels.JungleJapes,
        default_slam_level: int = 0,
    ) -> bool:
        """Determine whether the kong has the necessary moves based on the switchsanity data."""
        data = self.settings.switchsanity_data[switchsanity_setting]
        kong_data = self.IsKong(data.kong)
        if not kong_needs_current:
            kong_data = self.HasKong(data.kong)
        if data.switch_type == SwitchType.PadMove:
            pad_abilities = [self.blast, self.spring, self.balloon, self.monkeyport, self.gorillaGone]
            return kong_data and pad_abilities[data.kong]
        elif data.switch_type == SwitchType.MiscActivator:
            misc_abilities = [self.grab, self.charge, False, False, False]
            return kong_data and misc_abilities[data.kong]
        elif data.switch_type == SwitchType.GunSwitch:
            gun_abilities = [self.coconut, self.peanut, self.grape, self.feather, self.pineapple]
            return kong_data and gun_abilities[data.kong]
        elif data.switch_type == SwitchType.InstrumentPad:
            instrument_abilities = [self.bongos, self.guitar, self.trombone, self.saxophone, self.triangle]
            return kong_data and instrument_abilities[data.kong]
        elif data.switch_type == SwitchType.SlamSwitch:
            return kong_data and self.CanSlamSwitch(level, default_slam_level)
        return False

    def CanPhaseswim(self):
        """Determine whether the player can perform phase swim."""
        return self.phaseswim and self.swim

    def CanSTS(self):
        """Determine whether the player can perform swim through shores."""
        return self.swim_through_shores and self.swim

    def CanMoonkick(self):
        """Determine whether the player can perform a moonkick."""
        return self.moonkicks and self.isdonkey and self.settings.kong_model_dk == KongModels.default

    def CanOStandTBSNoclip(self):
        """Determine whether the player can perform Orangstand TBS Noclip."""
        return self.tbs and self.handstand and self.islanky

    def CanAccessRNDRoom(self):
        """Determine whether the player can enter an R&D Room with glitches."""
        return self.CanPhase() or self.generalclips or self.CanOStandTBSNoclip()

    def CanGetOnCannonGamePlatform(self):
        """Determine whether the player can get on the platform in Cannon Game Room in Gloomy Galleon."""
        return Events.WaterRaised in self.Events or (self.advanced_platforming and (self.ischunky or (self.islanky and self.settings.kong_model_lanky == KongModels.default)))

    def CanSkew(self, swim, is_japes=True, kong_req=Kongs.any):
        """Determine whether the player can skew."""
        if swim:
            return self.skew and self.swim and self.HasGun(kong_req) and self.CanPhaseswim()
        satisfies_cannon_req = True
        if is_japes:
            satisfies_cannon_req = Events.JapesAccessToCannon in self.Events
        return self.skew and self.oranges and self.settings.damage_amount != DamageAmount.ohko and satisfies_cannon_req

    def canFulfillProgHint(self, value: int) -> bool:
        """Determine whether the player can view a progressive hint."""
        req_item = self.settings.progressive_hint_item
        if req_item == ProgressiveHintItem.off:
            return True
        barrier_item = getProgHintBarrierItem(req_item)
        if barrier_item is None:
            raise Exception("Invalid Item for progressive hints")
        return self.ItemCheck(barrier_item, value)

    def CanMoontail(self):
        """Determine whether the player can perform a Moontail."""
        return self.moontail and self.isdiddy and self.settings.kong_model_diddy == KongModels.default  # Krusha doesnt have the jump height that Diddy has

    def CanPhase(self):
        """Determine whether the player can phase."""
        return self.phasewalk or (self.phasefall and (self.ischunky and self.camera))

    def AddEvent(self, event):
        """Add an event to events list so it can be checked for logically."""
        self.Events.append(event)

    def GetKongs(self):
        """Return all owned kongs."""
        ownedKongs = []
        if self.donkey:
            ownedKongs.append(Kongs.donkey)
        if self.diddy:
            ownedKongs.append(Kongs.diddy)
        if self.lanky:
            ownedKongs.append(Kongs.lanky)
        if self.tiny:
            ownedKongs.append(Kongs.tiny)
        if self.chunky:
            ownedKongs.append(Kongs.chunky)
        return ownedKongs

    def IsKong(self, kong):
        """Check if logic is currently a specific kong."""
        if kong == Kongs.donkey:
            return self.isdonkey
        if kong == Kongs.diddy:
            return self.isdiddy
        if kong == Kongs.lanky:
            return self.islanky
        if kong == Kongs.tiny:
            return self.istiny
        if kong == Kongs.chunky:
            return self.ischunky
        if kong == Kongs.any:
            return True

    def HasKong(self, kong):
        """Check if logic currently owns a specific kong."""
        if kong == Kongs.donkey:
            return self.donkey
        if kong == Kongs.diddy:
            return self.diddy
        if kong == Kongs.lanky:
            return self.lanky
        if kong == Kongs.tiny:
            return self.tiny
        if kong == Kongs.chunky:
            return self.chunky
        if kong == Kongs.any:
            return True

    def HasGun(self, kong):
        """Check if logic currently is currently the specified kong and owns a gun for them."""
        if kong == Kongs.donkey:
            return self.coconut and self.isdonkey
        elif kong == Kongs.diddy:
            return self.peanut and self.isdiddy
        elif kong == Kongs.lanky:
            return self.grape and self.islanky
        elif kong == Kongs.tiny:
            return self.feather and self.istiny
        elif kong == Kongs.chunky:
            return self.pineapple and self.ischunky
        elif kong == Kongs.any:
            return (self.coconut and self.isdonkey) or (self.peanut and self.isdiddy) or (self.grape and self.islanky) or (self.feather and self.istiny) or (self.pineapple and self.ischunky)
        return False

    def HasInstrument(self, kong):
        """Check if logic currently is currently the specified kong and owns an instrument for them."""
        if kong == Kongs.donkey:
            return self.bongos and self.isdonkey
        if kong == Kongs.diddy:
            return self.guitar and self.isdiddy
        if kong == Kongs.lanky:
            return self.trombone and self.islanky
        if kong == Kongs.tiny:
            return self.saxophone and self.istiny
        if kong == Kongs.chunky:
            return self.triangle and self.ischunky
        if kong == Kongs.any:
            return (self.bongos and self.isdonkey) or (self.guitar and self.isdiddy) or (self.trombone and self.islanky) or (self.saxophone and self.istiny) or (self.triangle and self.ischunky)

    def ItemCounts(self):
        """Get the amount of items collected in terms of B. Locker-relevant items."""
        # Calculate Colored Bananas count
        CBCount = sum(sum(lvl) for lvl in self.ColoredBananas)

        # List of moves
        moves = [
            self.vines,
            self.swim,
            self.oranges,
            self.barrels,
            self.climbing,
            self.blast,
            self.strongKong,
            self.grab,
            self.charge,
            self.jetpack,
            self.spring,
            self.handstand,
            self.balloon,
            self.sprint,
            self.mini,
            self.twirl,
            self.monkeyport,
            self.hunkyChunky,
            self.punch,
            self.gorillaGone,
            self.coconut,
            self.peanut,
            self.grape,
            self.feather,
            self.pineapple,
            self.bongos,
            self.guitar,
            self.trombone,
            self.saxophone,
            self.triangle,
            self.camera,
            self.shockwave,
            self.scope,
            self.homing,
        ]

        # Calculate keys count
        keys = sum([self.JapesKey, self.AztecKey, self.FactoryKey, self.GalleonKey, self.ForestKey, self.CavesKey, self.CastleKey, self.HelmKey])

        # Calculate company coins count
        company_coins = self.nintendoCoin + self.rarewareCoin

        # Calculate game percentage
        game_percentage = 0.4 * self.GoldenBananas + 0.5 * self.BattleCrowns + 0.2 * self.BananaFairies + 0.2 * self.BananaMedals + 0.25 * keys + 0.5 * company_coins
        if game_percentage == 100.4:
            game_percentage = 101

        # Create check counts dictionary
        check_counts = {
            BarrierItems.GoldenBanana: self.GoldenBananas,
            BarrierItems.Blueprint: len(self.Blueprints),
            BarrierItems.CompanyCoin: company_coins,
            BarrierItems.Key: keys,
            BarrierItems.Medal: self.BananaMedals,
            BarrierItems.Crown: self.BattleCrowns,
            BarrierItems.Fairy: self.BananaFairies,
            BarrierItems.RainbowCoin: self.RainbowCoins,
            BarrierItems.Bean: self.Beans,
            BarrierItems.Pearl: self.Pearls,
            BarrierItems.ColoredBanana: CBCount,
            BarrierItems.IceTrap: True,  # TODO
            BarrierItems.Kong: sum([self.donkey, self.diddy, self.lanky, self.tiny, self.chunky]),
            BarrierItems.Move: sum(moves) + self.Slam + self.AmmoBelts + self.InstUpgrades,
            BarrierItems.Percentage: int(game_percentage),
        }

        return check_counts

    def ItemCheck(self, item: BarrierItems, count: int) -> bool:
        """Check if item requirement has been fulfilled."""
        check_counts = self.ItemCounts()
        if item in check_counts.keys():
            return check_counts[item] >= count
        return True

    def CrownDoorOpened(self):
        """Check if Crown Door is opened."""
        if self.settings.crown_door_item == BarrierItems.Nothing:
            return True
        return self.ItemCheck(self.settings.crown_door_item, self.settings.crown_door_item_count)

    def CoinDoorOpened(self):
        """Check if Coin Door is opened."""
        if self.settings.coin_door_item == BarrierItems.Nothing:
            return True
        return self.ItemCheck(self.settings.coin_door_item, self.settings.coin_door_item_count)

    def CanFreeDiddy(self):
        """Check if the cage locking Diddy's vanilla location can be opened."""
        return self.HasGun(self.settings.diddy_freeing_kong)  # In Archipelago, we can't put a Kong in the cage (yet?)
        # return self.spoiler.LocationList[Locations.DiddyKong].item == Items.NoItem or self.HasGun(self.settings.diddy_freeing_kong)

    def CanOpenJapesGates(self):
        """Check if we can pick up the item inside Diddy's cage, thus opening the gates in Japes."""
        # In Archipelago, we can't know what item is in this location, but we do know that it will always contain something
        # caged_item_id = self.spoiler.LocationList[Locations.JapesDonkeyFreeDiddy].item
        # If it's NoItem, then the gates are already open
        # if caged_item_id == Items.NoItem:
        #     return True
        # If we can't free Diddy, then we can't access the item so we can't reach the item
        # if not self.CanFreeDiddy():
        #     return False
        # If we are the right kong, then we can always get the item
        if self.IsKong(self.settings.diddy_freeing_kong):
            return True
        # If we aren't the right kong, we need free trade to be on
        elif self.settings.free_trade_items:
            return True  # In Archipelago, we can't know what item is in this location. We must assume full FTA, so the rest of this is irrelevant
            # # During the fill we can't assume this item is accessible quite yet - this could cause errors with placing items in the back of Japes
            # if caged_item_id is None:
            #     return False
            # # If it's not a blueprint, free trade gets us the item
            # if ItemList[caged_item_id].type != Types.Blueprint:
            #     return True
            # # But if it is a blueprint, we need to check blueprint access (which checks blueprint free trade)
            # else:
            #     return self.BlueprintAccess(ItemList[caged_item_id])
        # If we failed to hit a successful condition, we failed to reach the caged item
        return False

    def CanFreeTiny(self):
        """Check if kong at Tiny location can be freed, requires either chimpy charge or primate punch."""
        # In Archipelago, we can't put a Kong in the cage (yet?)
        return self.IsKong(self.settings.tiny_freeing_kong) or self.settings.free_trade_items
        # if self.spoiler.LocationList[Locations.TinyKong].item == Items.NoItem:
        #     return self.IsKong(self.settings.tiny_freeing_kong) or self.settings.free_trade_items
        # elif self.settings.tiny_freeing_kong == Kongs.diddy:
        #     return self.charge and self.isdiddy
        # elif self.settings.tiny_freeing_kong == Kongs.chunky:
        #     return self.punch and self.ischunky
        # # Used only as placeholder during fill when kong puzzles are not yet assigned
        # elif self.settings.tiny_freeing_kong == Kongs.any:
        #     return True

    def CanLlamaSpit(self):
        """Check if the Llama spit can be triggered."""
        return self.HasInstrument(self.settings.lanky_freeing_kong)

    def CanFreeLanky(self):
        """Check if kong at Lanky location can be freed, requires freeing kong to have its gun and instrument."""
        # In Archipelago, we can't put a Kong in the cage (yet?)
        return (self.swim and self.HasInstrument(self.settings.lanky_freeing_kong)) or self.CanPhase() or self.CanPhaseswim()
        # return (self.HasGun(self.settings.lanky_freeing_kong) or self.spoiler.LocationList[Locations.LankyKong].item == Items.NoItem) and (
        #     (self.swim and self.HasInstrument(self.settings.lanky_freeing_kong)) or self.CanPhase() or self.CanPhaseswim()
        # )

    def CanFreeChunky(self):
        """Check if kong at Chunky location can be freed."""
        # In Archipelago, we can't put a Kong in the cage (yet?)
        return self.IsKong(self.settings.chunky_freeing_kong) or self.settings.free_trade_items
        # # If the cage is empty, the item is just lying on the ground
        # if self.spoiler.LocationList[Locations.ChunkyKong].item == Items.NoItem:
        #     return self.IsKong(self.settings.chunky_freeing_kong) or self.settings.free_trade_items
        # # Otherwise you need the right slam level (usually 1)
        # else:
        #     return self.CanSlamSwitch(Levels.FranticFactory, 1) and self.IsKong(self.settings.chunky_freeing_kong)

    def AddCollectible(self, collectible, level):
        """Add a collectible."""
        if collectible.enabled:
            missingGun = False
            if collectible.type == Collectibles.coin:
                # Normal coins, add amount for the kong
                self.Coins[collectible.kong] += collectible.amount
                self.RegularCoins[collectible.kong] += collectible.amount
            # Add bananas for correct level for this kong
            elif collectible.type == Collectibles.banana:
                self.ColoredBananas[level][collectible.kong] += collectible.amount
            # Add 5 times amount of banana bunches
            elif collectible.type == Collectibles.bunch:
                self.ColoredBananas[level][collectible.kong] += collectible.amount * 5
            # Add 10 bananas for a balloon
            elif collectible.type == Collectibles.balloon:
                if self.HasGun(collectible.kong):
                    self.ColoredBananas[level][collectible.kong] += collectible.amount * 10
                    collectible.added = True
                missingGun = True
            if not missingGun:
                collectible.added = True

    def PurchaseShopItem(self, location_id):
        """Purchase from this location and subtract price from logical coin counts."""
        # In Archipelago, all shops are free - we're not touching coin logic with a 12000000 ft pole
        return
        # location = self.spoiler.LocationList[location_id]
        # price = GetPriceAtLocation(self.settings, location_id, location, self.Slam, self.AmmoBelts, self.InstUpgrades)
        # if price is None:  # This shouldn't happen but it's probably harmless
        #     return  # TODO: solve this
        # # If shared move, take the price from all kongs EVEN IF THEY AREN'T FREED YET
        # if location.kong == Kongs.any:
        #     for kong in range(0, 5):
        #         self.Coins[kong] -= price
        #         self.SpentCoins[kong] += price
        #     return
        # # If kong specific move, just that kong paid for it
        # else:
        #     self.Coins[location.kong] -= price
        #     self.SpentCoins[location.kong] += price
        #     return

    def TimeAccess(self, region, time):
        """Check if a certain region has the given time of day access for current kong."""
        # In Archipelago, we're always using the Dusk setting so it is both day and night simultaneously
        # In addition, this method is only ever called when checking the current region, which implies you already have access to the region.
        return True
        # if time == Time.Day:
        #     return self.spoiler.RegionList[region].dayAccess[self.kong]
        # elif time == Time.Night:
        #     return self.spoiler.RegionList[region].nightAccess[self.kong]
        # # Not sure when this'd be used
        # else:  # if time == Time.Both
        #     return self.spoiler.RegionList[region].dayAccess[self.kong] or self.spoiler.RegionList[region].nightAccess[self.kong]

    def BlueprintAccess(self, item):
        """Check if we are the correct kong for this blueprint item."""
        if item is None or item.type != Types.Blueprint:
            return False
        return self.settings.free_trade_blueprints or self.IsKong(item.kong)

    def HintAccess(self, location, region_id):
        """Check if we are the right kong for this hint door."""
        # The only weird exception: vanilla Fungi Lobby hint doors only check for Chunky, not the current Kong, and all besides Chunky's needs grab
        if not self.settings.wrinkly_location_rando and not self.settings.remove_wrinkly_puzzles and region_id == RegionEnum.FungiForestLobby:
            return self.chunky and (location.kong == Kongs.chunky or (self.donkey and self.grab))
        return self.HasKong(location.kong)

    # V1 LIMITATION: Shops must be free to avoid being locked out by coin logic - undoing this will require substantial safeguards or a great deal of caution
    # The current workaround also needs to check if you own the right shopkeeper
    def CanBuy(self, location, buy_empty=False):
        """Check if there are enough coins to purchase this location."""
        if self.spoiler.LocationList[location].vendor == VendorType.Cranky:
            return self.crankyAccess
        elif self.spoiler.LocationList[location].vendor == VendorType.Funky:
            return self.funkyAccess
        elif self.spoiler.LocationList[location].vendor == VendorType.Candy:
            return self.candyAccess
        return False
        # return CanBuy(self.spoiler, location, self, buy_empty)

    def AnyKongCanBuy(self, location, buy_empty=False):
        """Check if there are enough coins for any owned kong to purchase this location."""
        if self.spoiler.LocationList[location].vendor == VendorType.Cranky:
            return self.crankyAccess
        elif self.spoiler.LocationList[location].vendor == VendorType.Funky:
            return self.funkyAccess
        elif self.spoiler.LocationList[location].vendor == VendorType.Candy:
            return self.candyAccess
        return False
        # return AnyKongCanBuy(self.spoiler, location, self, buy_empty)

    def CanAccessKRool(self):
        """Make sure that each required key has been turned in."""
        required_base_keys = [
            Events.JapesKeyTurnedIn,
            Events.AztecKeyTurnedIn,
            Events.FactoryKeyTurnedIn,
            Events.GalleonKeyTurnedIn,
            Events.ForestKeyTurnedIn,
            Events.CavesKeyTurnedIn,
            Events.CastleKeyTurnedIn,
            Events.HelmKeyTurnedIn,
        ]
        if self.settings.k_rool_vanilla_requirement:
            required_base_keys = [
                Events.FactoryKeyTurnedIn,
                Events.HelmKeyTurnedIn,
            ]
        return all(not keyRequired not in self.Events for keyRequired in self.settings.krool_keys_required if keyRequired in required_base_keys)

    def IsKLumsyFree(self):
        """Check all keys."""
        return all(not keyRequired not in self.Events for keyRequired in self.settings.krool_keys_required)

    def IsBossReachable(self, level):
        """Check if the boss banana requirement is met."""
        return self.HasEnoughKongs(level) and ((sum(self.ColoredBananas[level]) >= self.settings.BossBananas[level]) or self.troff_skip)

    def HasEnoughKongs(self, level, forPreviousLevel=False):
        """Check if kongs are required for progression, do we have enough to reach the given level."""
        # In Archipelago, there's no concept of "before level X" due to the multiworld nature. Because of that there's no point in checking for Kong count.
        return True
        # # If your kongs are not progression (LZR, no logic, etc.) or it's *complex* level order, these requirements don't apply
        # if self.settings.kongs_for_progression and not self.settings.hard_level_progression:
        #     levelIndex = 8
        #     if level != Levels.HideoutHelm:
        #         # Figure out where this level fits in the progression
        #         levelIndex = GetShuffledLevelIndex(level)
        #         if forPreviousLevel:
        #             levelIndex = levelIndex - 1
        #     # Must have sufficient kongs freed to make forward progress for first 5 levels
        #     if levelIndex < 5:
        #         return len(self.GetKongs()) > levelIndex
        #     else:
        #         # Expect to have all the kongs by level 6
        #         return len(self.GetKongs()) == 5
        # else:
        #     return True

    def isKrushaAdjacent(self, kong: Kongs):
        """Check if player is a krusha-adjacent model."""
        settings_values = [
            self.settings.kong_model_dk,
            self.settings.kong_model_diddy,
            self.settings.kong_model_lanky,
            self.settings.kong_model_tiny,
            self.settings.kong_model_chunky,
        ]
        return settings_values[kong] in (KongModels.krusha, KongModels.krool_cutscene, KongModels.krool_fight)

    def CanSlamChunkyPhaseSwitch(self):
        """Check if the player can slam the switch in Chunky Phase."""
        stg = self.settings.chunky_phase_slam_req_internal
        if stg == SlamRequirement.blue:
            return self.superSlam
        elif stg == SlamRequirement.red:
            return self.superDuperSlam
        return self.Slam

    def IsBossBeatable(self, level):
        """Return true if the boss for a given level is beatable according to boss location rando and boss kong rando."""
        requiredKong = self.settings.boss_kongs[level]
        bossFight = self.settings.boss_maps[level]
        # Ensure we have the required moves for the boss fight itself
        hasRequiredMoves = True
        if (
            bossFight == Maps.FactoryBoss
            and requiredKong == Kongs.tiny
            and not (self.HardBossesSettingEnabled(HardBossesSelected.alternative_mad_jack_kongs) and self.settings.kong_model_tiny == KongModels.default)
        ):
            hasRequiredMoves = self.twirl and self.Slam
        elif bossFight == Maps.FactoryBoss:
            hasRequiredMoves = self.Slam
        elif bossFight == Maps.FungiBoss:
            hasRequiredMoves = self.hunkyChunky and self.barrels
        elif bossFight == Maps.JapesBoss or bossFight == Maps.AztecBoss or bossFight == Maps.CavesBoss:
            hasRequiredMoves = self.barrels
        elif bossFight == Maps.CastleBoss and self.IsLavaWater():
            hasRequiredMoves = self.Melons >= 3
        elif bossFight == Maps.KroolDonkeyPhase:
            hasRequiredMoves = (self.blast or (not self.settings.cannons_require_blast)) and self.climbing
        elif bossFight == Maps.KroolDiddyPhase:
            hasRequiredMoves = self.jetpack and self.peanut
        elif bossFight == Maps.KroolLankyPhase:
            hasRequiredMoves = self.barrels and self.trombone
        elif bossFight == Maps.KroolTinyPhase:
            hasRequiredMoves = self.mini and self.feather and (self.climbing or self.twirl)
        elif bossFight == Maps.KroolChunkyPhase:
            hasRequiredMoves = self.punch and self.CanSlamChunkyPhaseSwitch() and self.hunkyChunky and self.gorillaGone
        # Archipelago doesn't have to worry about fixing T&S values or place bosses, so this chunk is irrelevant
        # # In simple level order, there are a couple very specific cases we have to account for in order to prevent boss fill failures
        # level_order_matters = not self.settings.hard_level_progression and self.settings.shuffle_loading_zones in (
        #     ShuffleLoadingZones.none,
        #     ShuffleLoadingZones.levels,
        # )
        # if level_order_matters and not self.assumeFillSuccess:  # These conditions only matter on fill, not on playthrough
        #     order_of_level = 8 # Guaranteed to be 1-8 here
        #     for level_order in self.settings.level_order:
        #         if self.settings.level_order[level_order] == level:
        #             order_of_level = level_order
        #     if order_of_level == 4 and not self.barrels:  # Prevent Barrels on boss 3
        #         return False
        #     if order_of_level == 7 and (
        #         not self.hunkyChunky or (not self.twirl and not self.HardBossesSettingEnabled(HardBossesSelected.alternative_mad_jack_kongs))
        #     ):  # Prevent Hunky on boss 7, and also Twirl on non-hard bosses
        #         return False
        return self.IsKong(requiredKong) and hasRequiredMoves

    def HasFillRequirementsForLevel(self, level):
        """Check if we meet the fill's move requirements for the given level."""
        # In Archipelago, there's no concept of "before level X" due to the multiworld nature. Because of that there's no point in checking for item ownership "before level X".
        return True
        # # These requirements are only relevant for fill purposes - once we know the fill is valid, we can ignore these requirements
        # if self.assumeFillSuccess:
        #     return True
        # # Additionally, these restrictions only apply to simple level order, as these are the only seeds progressing levels in 1-7 order
        # level_order_matters = not self.settings.hard_level_progression and self.settings.shuffle_loading_zones in (
        #     ShuffleLoadingZones.none,
        #     ShuffleLoadingZones.levels,
        # )
        # if level_order_matters:
        #     # Levels have some special requirements depending on where they fall in the level order
        #     order_of_level = 8
        #     order_of_aztec = 0
        #     for level_order in self.settings.level_order:
        #         if self.settings.level_order[level_order] == level:
        #             order_of_level = level_order
        #         if self.settings.level_order[level_order] == Levels.AngryAztec:
        #             order_of_aztec = level_order
        #     # You need to have vines or twirl before you can enter Aztec or any level beyond it
        #     if order_of_level >= order_of_aztec and not (self.can_use_vines or (self.istiny and self.twirl)):
        #         return False
        #     if order_of_level >= 4:
        #         # Require the following moves by level 4:
        #         # - Swim so you can get into Lobby 4. This prevents logic from skipping this level for T&S requirements, preventing 0'd T&S.
        #         # - Barrels so there will always be an eligible boss fill given the available moves at any level.
        #         # - Vines for gameplay reasons. Needing vines for Helm is a frequent bottleneck and this eases the hunt for it.
        #         if not self.swim or not self.barrels or not self.can_use_vines:
        #             return False
        #         # Require one of twirl or hunky chunky by level 7 to prevent non-hard-boss fill failures
        #         if not self.HardBossesSettingEnabled(HardBossesSelected.alternative_mad_jack_kongs) and order_of_level >= 7 and not (self.twirl or self.hunkyChunky):
        #             return False
        #         # Require both hunky chunky and twirl (or hard bosses) before Helm to prevent boss fill failures
        #         if order_of_level > 7 and not (self.hunkyChunky and (self.twirl or self.HardBossesSettingEnabled(HardBossesSelected.alternative_mad_jack_kongs))):
        #             return False
        #     # Make sure we have access to all prior required keys before entering the next level - this prevents keys from being placed in levels beyond what they unlock
        #     if order_of_level > 1 and not self.JapesKey:
        #         return False
        #     elif order_of_level > 2 and not self.AztecKey:
        #         return False
        #     elif order_of_level > 4 and (not self.FactoryKey or not self.GalleonKey):
        #         return False
        #     elif order_of_level > 5 and not self.ForestKey:
        #         return False
        #     elif order_of_level > 7 and (not self.CavesKey or not self.CastleKey):
        #         return False
        # # If we have the moves, ensure we have enough kongs as well
        # return self.HasEnoughKongs(level, forPreviousLevel=True)

    def CanBeatLankyPhase(self):
        """Check whether the player can beat Lanky phase of K Rool."""
        if self.HardBossesSettingEnabled(HardBossesSelected.beta_lanky_phase):
            return self.lanky and self.grape and self.barrels
        return self.lanky and self.trombone and self.barrels

    def IsLevelEnterable(self, level):
        """Check if level entry requirement is met."""
        # We must meet the fill's kong and move requirements to enter this level
        if not self.HasFillRequirementsForLevel(level):
            return False
        # Calculate what levels we can glitch into
        dk_skip_levels = [
            Levels.AngryAztec,
            Levels.GloomyGalleon,
            Levels.FungiForest,
            Levels.CrystalCaves,
            Levels.CreepyCastle,
        ]
        if self.CanMoonkick():
            dk_skip_levels.append(Levels.HideoutHelm)
        can_dk_skip = self.isdonkey and self.dk_blocker_skip and level in dk_skip_levels
        can_diddy_skip = self.isdiddy and self.lanky_blocker_skip and level == Levels.HideoutHelm and self.generalclips
        can_lanky_skip = self.islanky and self.lanky_blocker_skip and level != Levels.HideoutHelm
        can_tiny_skip = self.istiny and self.lanky_blocker_skip and level == Levels.HideoutHelm and self.generalclips
        can_chunky_skip = self.ischunky and self.lanky_blocker_skip and self.punch and level not in (Levels.FranticFactory, Levels.HideoutHelm)
        available_items = self.ItemCounts()
        can_pay_blocker = self.assumePaidBLockers or available_items[self.settings.BLockerEntryItems[level]] >= self.settings.BLockerEntryCount[level]
        # To enter a level, we either need (or assume) enough stuff to get rid of B. Locker or a glitch way to bypass it
        return can_pay_blocker or can_dk_skip or can_diddy_skip or can_lanky_skip or can_tiny_skip or can_chunky_skip

    def WinConditionMet(self):
        """Check if the current game state has met the win condition."""
        # Special Win Cons
        if self.settings.win_condition_item == WinConditionComplex.beat_krool:
            return Events.KRoolDefeated in self.Events
        elif self.settings.win_condition_item == WinConditionComplex.krem_kapture:  # Photo taking doesn't have a perfect wincon so this'll do until something better is concocted
            return Events.KRoolDefeated in self.Events and self.camera
        elif self.settings.win_condition_item == WinConditionComplex.get_key8:
            return self.HelmKey
        elif self.settings.win_condition_item == WinConditionComplex.dk_rap_items:
            dk_rap_items = [
                self.donkey,
                self.diddy,
                self.lanky,
                self.tiny,
                self.chunky,
                self.coconut,
                self.peanut,
                self.grape,
                self.pineapple,
                self.guitar,
                self.trombone,
                self.strongKong,
                # self.spring,
                self.jetpack,
                self.handstand,
                self.balloon,
                self.mini,
                self.twirl,
                # self.hunkyChunky,
                self.barrels,
                self.oranges,
                # self.shockwave,
                self.climbing,
                # self.superDuperSlam,
                self.crankyAccess,
            ]
            for k in dk_rap_items:
                if not k:
                    return False
            return True
        # Get X amount of Y item win cons
        win_con_table = {
            WinConditionComplex.req_bean: BarrierItems.Bean,
            WinConditionComplex.req_bp: BarrierItems.Blueprint,
            WinConditionComplex.req_companycoins: BarrierItems.CompanyCoin,
            WinConditionComplex.req_crown: BarrierItems.Crown,
            WinConditionComplex.req_fairy: BarrierItems.Fairy,
            WinConditionComplex.req_key: BarrierItems.Key,
            WinConditionComplex.req_gb: BarrierItems.GoldenBanana,
            WinConditionComplex.req_medal: BarrierItems.Medal,
            WinConditionComplex.req_pearl: BarrierItems.Pearl,
            WinConditionComplex.req_rainbowcoin: BarrierItems.RainbowCoin,
        }
        if self.settings.win_condition_item not in win_con_table:
            raise Exception(f"Invalid Win Condition {self.settings.win_condition_item.name}")
        return self.ItemCheck(win_con_table[self.settings.win_condition_item], self.settings.win_condition_count)

    def CanGetRarewareCoin(self):
        """Check if you meet the logical requirements to obtain the Rareware Coin."""
        have_enough_medals = self.BananaMedals >= self.settings.medal_requirement
        # Make sure you have access to enough levels to fit the locations in. This isn't super precise and doesn't need to be.
        required_level_order = max(2, min(ceil(self.settings.medal_requirement / 4), 7))  # At least level 2 to give space for medal placements, at most level 6 to allow shenanigans
        # AP adjustment: also needs to check if you own Cranky
        return self.crankyAccess and have_enough_medals and self.HasFillRequirementsForLevel(self.settings.level_order[required_level_order])

    def CanGetRarewareGB(self):
        """Check if you meet the logical requirements to obtain the Rareware GB."""
        have_enough_fairies = self.BananaFairies >= self.settings.rareware_gb_fairies
        is_correct_kong = self.istiny or self.settings.free_trade_items
        required_level_order = max(2, min(ceil(self.settings.rareware_gb_fairies / 2), 5))  # At least level 2 to give space for fairy placements, at most level 5 to allow shenanigans
        return have_enough_fairies and is_correct_kong and self.HasFillRequirementsForLevel(self.settings.level_order[required_level_order])

    def CanSurviveFallDamage(self):
        """Check if you can survive a single instance of fall damage."""
        if self.settings.damage_amount != DamageAmount.ohko:
            if self.settings.damage_amount != DamageAmount.quad or self.Melons > 1:
                return True
        return False
