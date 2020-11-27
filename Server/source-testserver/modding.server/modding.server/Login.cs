
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;

namespace modding.server.login
{
    public class Login: IScript
    {
        [ScriptEvent(ScriptEventType.PlayerConnect)]
        public void PlayerConnect(IPlayer player, string reason)
        {
            player.Model = 2426248831;
            player.Spawn(new Position(0, 0, 72));
            player.GiveWeapon(WeaponModel.APPistol, 300, true);
        }
    }
}
