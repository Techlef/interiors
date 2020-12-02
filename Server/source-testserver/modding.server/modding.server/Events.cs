using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Resources.Chat.Api;

namespace modding.server.events
{
    public class Events : IScript
    {
        [ScriptEvent(ScriptEventType.PlayerDead)]
        public static void OnPlayerDeath(IPlayer player, IPlayer killer, uint reason)
        {
            player.RemoveAllWeapons();
            player.Spawn(new Position(0, 0, 72), 4000);
            player.SendChatMessage("You are revived!");
        }
    }
}
