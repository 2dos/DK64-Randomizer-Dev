'Logic file for Creepy Castle.'
_C=None
_B=False
_A=True
from randomizer.Enums.Events import Events
from randomizer.Enums.Kongs import Kongs
from randomizer.Enums.Levels import Levels
from randomizer.Enums.Locations import Locations
from randomizer.Enums.MinigameType import MinigameType
from randomizer.Enums.Regions import Regions
from randomizer.Enums.Transitions import Transitions
from randomizer.LogicClasses import Event,LocationLogic,Region,TransitionFront
LogicRegions={Regions.CreepyCastleMain:Region('Creepy Castle Main',Levels.CreepyCastle,_A,_C,[LocationLogic(Locations.CastleDonkeyMedal,lambda l:l.ColoredBananas[Levels.CreepyCastle][Kongs.donkey]>=75),LocationLogic(Locations.CastleDiddyMedal,lambda l:l.ColoredBananas[Levels.CreepyCastle][Kongs.diddy]>=75),LocationLogic(Locations.CastleLankyMedal,lambda l:l.ColoredBananas[Levels.CreepyCastle][Kongs.lanky]>=75),LocationLogic(Locations.CastleTinyMedal,lambda l:l.ColoredBananas[Levels.CreepyCastle][Kongs.tiny]>=75),LocationLogic(Locations.CastleChunkyMedal,lambda l:l.ColoredBananas[Levels.CreepyCastle][Kongs.chunky]>=75),LocationLogic(Locations.CastleDiddyAboveCastle,lambda l:l.jetpack and l.isdiddy,MinigameType.BonusBarrel),LocationLogic(Locations.CastleKasplatHalfway,lambda l:not l.settings.kasplat_location_rando),LocationLogic(Locations.CastleKasplatLowerLedge,lambda l:not l.settings.kasplat_location_rando)],[Event(Events.CastleEntered,lambda l:_A)],[TransitionFront(Regions.CreepyCastleLobby,lambda l:_A,Transitions.CastleToIsles),TransitionFront(Regions.CastleWaterfall,lambda l:_A),TransitionFront(Regions.CastleTree,lambda l:Events.CastleTreeOpened in l.Events,Transitions.CastleMainToTree),TransitionFront(Regions.Library,lambda l:l.superDuperSlam and l.isdonkey,Transitions.CastleMainToLibraryStart),TransitionFront(Regions.Ballroom,lambda l:l.superDuperSlam and l.diddy,Transitions.CastleMainToBallroom),TransitionFront(Regions.Tower,lambda l:l.superDuperSlam and l.islanky,Transitions.CastleMainToTower),TransitionFront(Regions.Greenhouse,lambda l:l.superDuperSlam and l.islanky,Transitions.CastleMainToGreenhouse),TransitionFront(Regions.TrashCan,lambda l:l.mini and l.istiny,Transitions.CastleMainToTrash),TransitionFront(Regions.Shed,lambda l:l.punch and l.ischunky,Transitions.CastleMainToShed),TransitionFront(Regions.Museum,lambda l:l.superDuperSlam and l.ischunky,Transitions.CastleMainToMuseum),TransitionFront(Regions.LowerCave,lambda l:_A,Transitions.CastleMainToLower),TransitionFront(Regions.UpperCave,lambda l:_A,Transitions.CastleMainToUpper),TransitionFront(Regions.CrankyCastle,lambda l:_A),TransitionFront(Regions.Snide,lambda l:_A),TransitionFront(Regions.CastleBossLobby,lambda l:_A),TransitionFront(Regions.CastleBaboonBlast,lambda l:l.blast and l.isdonkey)]),Regions.CastleBaboonBlast:Region('Castle Baboon Blast',Levels.CreepyCastle,_B,_C,[],[Event(Events.CastleTreeOpened,lambda l:l.isdonkey)],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A)]),Regions.CastleWaterfall:Region('Castle Waterfall',Levels.CreepyCastle,_B,_C,[],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A),TransitionFront(Regions.UpperCave,lambda l:_A,Transitions.CastleWaterfallToUpper)]),Regions.CastleTree:Region('Castle Tree',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleDonkeyTree,lambda l:l.scope and l.coconut and l.isdonkey),LocationLogic(Locations.CastleChunkyTree,lambda l:(l.scope or l.settings.hard_shooting)and l.pineapple and l.punch and l.ischunky,MinigameType.BonusBarrel),LocationLogic(Locations.CastleKasplatTree,lambda l:not l.settings.kasplat_location_rando and l.coconut and l.isdonkey),LocationLogic(Locations.CastleBananaFairyTree,lambda l:l.camera and l.coconut and l.isdonkey)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleTreeToMain),TransitionFront(Regions.CreepyCastleMain,lambda l:l.coconut and l.isdonkey,Transitions.CastleTreeDrainToMain)]),Regions.Library:Region('Library',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleDonkeyLibrary,lambda l:l.superDuperSlam and l.isdonkey and(l.strongKong or l.settings.damage_amount=='default'))],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleLibraryStartToMain),TransitionFront(Regions.CreepyCastleMain,lambda l:l.superDuperSlam and l.isdonkey,Transitions.CastleLibraryEndToMain)]),Regions.Ballroom:Region('Ballroom',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleDiddyBallroom,lambda l:l.jetpack and l.isdiddy,MinigameType.BonusBarrel)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleBallroomToMain),TransitionFront(Regions.MuseumBehindGlass,lambda l:l.monkeyport and l.mini and l.istiny,Transitions.CastleBallroomToMuseum)]),Regions.MuseumBehindGlass:Region('Museum Behind Glass',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleBananaFairyBallroom,lambda l:l.camera)],[],[TransitionFront(Regions.Ballroom,lambda l:l.monkeyport and l.mini and l.istiny,Transitions.CastleMuseumToBallroom),TransitionFront(Regions.CastleTinyRace,lambda l:l.mini and l.istiny,Transitions.CastleMuseumToCarRace)]),Regions.CastleTinyRace:Region('Castle Tiny Race',Levels.CreepyCastle,_B,_C,[LocationLogic(Locations.CastleTinyCarRace,lambda l:l.istiny)],[],[TransitionFront(Regions.MuseumBehindGlass,lambda l:_A,Transitions.CastleRaceToMuseum)],Transitions.CastleMuseumToCarRace),Regions.Tower:Region('Tower',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleLankyTower,lambda l:(l.scope or l.homing)and l.balloon and l.grape and l.islanky,MinigameType.BonusBarrel)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleTowerToMain)]),Regions.Greenhouse:Region('Greenhouse',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleLankyGreenhouse,lambda l:l.islanky),LocationLogic(Locations.CastleBattleArena,lambda l:l.islanky)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleGreenhouseStartToMain),TransitionFront(Regions.CreepyCastleMain,lambda l:l.islanky,Transitions.CastleGreenhouseEndToMain)]),Regions.TrashCan:Region('Trash Can',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleTinyTrashCan,lambda l:(l.saxophone or l.feather and(l.homing or l.settings.hard_shooting))and l.istiny)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleTrashToMain)]),Regions.Shed:Region('Shed',Levels.CreepyCastle,_B,_C,[LocationLogic(Locations.CastleChunkyShed,lambda l:l.punch and l.gorillaGone and l.ischunky)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleShedToMain)]),Regions.Museum:Region('Museum',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleChunkyMuseum,lambda l:l.punch and l.ischunky)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleMuseumToMain)]),Regions.LowerCave:Region('Lower Cave',Levels.CreepyCastle,_A,-1,[LocationLogic(Locations.CastleKasplatCrypt,lambda l:not l.settings.kasplat_location_rando)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleLowerToMain),TransitionFront(Regions.Crypt,lambda l:l.coconut and l.isdonkey or l.peanut and l.isdiddy or l.pineapple and l.ischunky,Transitions.CastleLowerToCrypt),TransitionFront(Regions.Mausoleum,lambda l:l.grape and l.islanky or l.feather and l.istiny,Transitions.CastleLowerToMausoleum),TransitionFront(Regions.FunkyCastle,lambda l:_A),TransitionFront(Regions.CastleBossLobby,lambda l:_A)]),Regions.Crypt:Region('Crypt',Levels.CreepyCastle,_B,-1,[LocationLogic(Locations.CastleDiddyCrypt,lambda l:l.peanut and l.charge and l.isdiddy),LocationLogic(Locations.CastleChunkyCrypt,lambda l:l.pineapple and l.punch and l.ischunky,MinigameType.BonusBarrel)],[],[TransitionFront(Regions.LowerCave,lambda l:_A,Transitions.CastleCryptToLower),TransitionFront(Regions.CastleMinecarts,lambda l:l.coconut and l.grab and l.isdonkey,Transitions.CastleCryptToCarts)]),Regions.CastleMinecarts:Region('Castle Minecarts',Levels.CreepyCastle,_B,_C,[LocationLogic(Locations.CastleDonkeyMinecarts,lambda l:l.isdonkey)],[],[TransitionFront(Regions.Crypt,lambda l:_A,Transitions.CastleCartsToCrypt)],Transitions.CastleCryptToCarts),Regions.Mausoleum:Region('Mausoleum',Levels.CreepyCastle,_B,_C,[LocationLogic(Locations.CastleLankyMausoleum,lambda l:l.grape and l.sprint and l.trombone and l.islanky),LocationLogic(Locations.CastleTinyMausoleum,lambda l:l.superDuperSlam and l.twirl and l.istiny)],[],[TransitionFront(Regions.LowerCave,lambda l:_A,Transitions.CastleMausoleumToLower)]),Regions.UpperCave:Region('Upper Cave',Levels.CreepyCastle,_A,-1,[LocationLogic(Locations.CastleTinyOverChasm,lambda l:l.twirl and l.istiny,MinigameType.BonusBarrel),LocationLogic(Locations.CastleKasplatNearCandy,lambda l:not l.settings.kasplat_location_rando)],[],[TransitionFront(Regions.CreepyCastleMain,lambda l:_A,Transitions.CastleUpperToMain),TransitionFront(Regions.CastleWaterfall,lambda l:_A,Transitions.CastleUpperToWaterfall),TransitionFront(Regions.Dungeon,lambda l:_A,Transitions.CastleUpperToDungeon),TransitionFront(Regions.CandyCastle,lambda l:_A),TransitionFront(Regions.CastleBossLobby,lambda l:_A)]),Regions.Dungeon:Region('Dungeon',Levels.CreepyCastle,_A,_C,[LocationLogic(Locations.CastleDonkeyDungeon,lambda l:l.superDuperSlam and l.donkey),LocationLogic(Locations.CastleDiddyDungeon,lambda l:l.superDuperSlam and l.scope and l.peanut and l.diddy),LocationLogic(Locations.CastleLankyDungeon,lambda l:l.superDuperSlam and l.trombone and l.balloon and l.islanky,MinigameType.BonusBarrel)],[],[TransitionFront(Regions.UpperCave,lambda l:_A,Transitions.CastleDungeonToUpper)]),Regions.CastleBossLobby:Region('Castle Boss Lobby',Levels.CreepyCastle,_A,_C,[],[],[TransitionFront(Regions.CastleBoss,lambda l:l.IsBossReachable(Levels.CreepyCastle))]),Regions.CastleBoss:Region('Castle Boss',Levels.CreepyCastle,_B,_C,[LocationLogic(Locations.CastleKey,lambda l:l.IsBossBeatable(Levels.CreepyCastle))],[],[])}