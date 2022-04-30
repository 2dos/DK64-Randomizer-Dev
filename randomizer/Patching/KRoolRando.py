'Apply K Rool Phase order.'
import js
from randomizer.Patching.EntranceRando import intToArr
from randomizer.Lists.MapsAndExits import Maps
from randomizer.Patching.Patcher import ROM
from randomizer.Spoiler import Spoiler
def randomize_krool(spoiler):
	'Apply K Rool Phase order based on krool_order from spoiler.';E='big';A=spoiler;F=33476640;G=88;ROM().seek(F+G);H=len(A.settings.krool_order);ROM().writeBytes(bytearray(A.settings.krool_order))
	for O in range(5-H):ROM().write(-1)
	C=A.settings.krool_order[0]
	if C!=0:
		I=[Maps.KroolDonkeyPhase,Maps.KroolDiddyPhase,Maps.KroolLankyPhase,Maps.KroolTinyPhase,Maps.KroolChunkyPhase];J=I[C];B=js.pointer_addresses[18]['entries'][Maps.Isles]['pointing_to'];ROM().seek(B);K=int.from_bytes(ROM().readBytes(2),E)
		for L in range(K):
			D=L*56+2;ROM().seek(B+D+18);M=int.from_bytes(ROM().readBytes(2),E)
			if M==Maps.KroolDonkeyPhase:ROM().seek(B+D+18);N=intToArr(J,2);ROM().writeBytes(bytearray(N))