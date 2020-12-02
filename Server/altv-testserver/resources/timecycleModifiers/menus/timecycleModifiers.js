import * as alt from 'alt';
import * as game from 'natives';
import * as NativeUI from 'includes/NativeUI/NativeUI';

const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;
const Color = NativeUI.Color;

let modifierStrength = 1.0;
let lastSelectedItem = -1;

const modifiers = [
    "AmbientPUSH", "AP1_01_B_IntRefRange", "AP1_01_C_NoFog", "Bank_HLWD", "Barry1_Stoned",
    "BarryFadeOut", "baseTONEMAPPING", "BeastIntro01", "BeastIntro02", "BeastLaunch01",
    "BeastLaunch02", "BikerFilter", "BikerForm01", "BikerFormFlash", "Bikers",
    "BikersSPLASH", "blackNwhite", "BlackOut", "BleepYellow01", "BleepYellow02",
    "Bloom", "BloomLight", "BloomMid", "buggy_shack", "buildingTOP",
    "BulletTimeDark", "BulletTimeLight", "CAMERA_BW", "CAMERA_secuirity", "CAMERA_secuirity_FUZZ",
    "canyon_mission", "carMOD_underpass", "carpark", "carpark_dt1_02", "carpark_dt1_03",
    "Carpark_MP_exit", "cashdepot", "cashdepotEMERGENCY", "cBank_back", "cBank_front",
    "ch2_tunnel_whitelight", "CH3_06_water", "CHOP", "cinema", "cinema_001",
    "cops", "CopsSPLASH", "crane_cam", "crane_cam_cinematic", "CrossLine01",
    "CrossLine02", "CS1_railwayB_tunnel", "CS3_rail_tunnel", "CUSTOM_streetlight", "damage",
    "DeadlineNeon01", "default", "DefaultColorCode", "DONT_overide_sunpos", "Dont_tazeme_bro",
    "dont_tazeme_bro_b", "downtown_FIB_cascades_opt", "DrivingFocusDark", "DrivingFocusLight", "DRUG_2_drive",
    "Drug_deadman", "Drug_deadman_blend", "drug_drive_blend01", "drug_drive_blend02", "drug_flying_01",
    "drug_flying_02", "drug_flying_base", "DRUG_gas_huffin", "drug_wobbly", "Drunk",
    "dying", "eatra_bouncelight_beach", "epsilion", "exile1_exit", "exile1_plane",
    "ExplosionJosh", "EXT_FULLAmbientmult_art", "ext_int_extlight_large", "EXTRA_bouncelight", "eyeINtheSKY",
    "Facebook_NEW", "facebook_serveroom", "FIB_5", "FIB_6", "FIB_A",
    "FIB_B", "FIB_interview", "FIB_interview_optimise", "FinaleBank", "FinaleBankexit",
    "FinaleBankMid", "fireDEPT", "FORdoron_delete", "Forest", "fp_vig_black",
    "fp_vig_blue", "fp_vig_brown", "fp_vig_gray", "fp_vig_green", "fp_vig_red",
    "FrankilinsHOUSEhills", "frankilnsAUNTS_new", "frankilnsAUNTS_SUNdir", "FRANKLIN", "FranklinColorCode",
    "FranklinColorCodeBasic", "FranklinColorCodeBright", "FullAmbientmult_interior", "gallery_refmod", "garage",
    "gen_bank", "glasses_black", "Glasses_BlackOut", "glasses_blue", "glasses_brown",
    "glasses_Darkblue", "glasses_green", "glasses_orange", "glasses_pink", "glasses_purple",
    "glasses_red", "glasses_Scuba", "glasses_VISOR", "glasses_yellow", "gorge_reflection_gpu",
    "gorge_reflectionoffset", "gorge_reflectionoffset2", "graveyard_shootout", "grdlc_int_02", "grdlc_int_02_trailer_cave",
    "gunclub", "gunclubrange", "gunshop", "gunstore", "half_direct",
    "hangar_lightsmod", "Hanger_INTmods", "heathaze", "heist_boat", "heist_boat_engineRoom",
    "heist_boat_norain", "helicamfirst", "heliGunCam", "Hicksbar", "HicksbarNEW",
    "hillstunnel", "Hint_cam", "hitped", "hud_def_blur", "hud_def_blur_switch",
    "hud_def_colorgrade", "hud_def_desat_cold", "hud_def_desat_cold_kill", "hud_def_desat_Franklin", "hud_def_desat_Michael",
    "hud_def_desat_Neutral", "hud_def_desat_switch", "hud_def_desat_Trevor", "hud_def_desatcrunch", "hud_def_flash",
    "hud_def_focus", "hud_def_Franklin", "hud_def_lensdistortion", "hud_def_lensdistortion_subtle", "hud_def_Michael",
    "hud_def_Trevor", "ImpExp_Interior_01", "IMpExt_Interior_02", "IMpExt_Interior_02_stair_cage", "InchOrange01",
    "InchOrange02", "InchPickup01", "InchPickup02", "InchPurple01", "InchPurple02",
    "INT_FullAmbientmult", "INT_FULLAmbientmult_art", "INT_FULLAmbientmult_both", "INT_garage", "INT_mall",
    "INT_NO_fogALPHA", "INT_NoAmbientmult", "INT_NoAmbientmult_art", "INT_NoAmbientmult_both", "INT_NOdirectLight",
    "INT_nowaterREF", "INT_posh_hairdresser", "INT_smshop", "INT_smshop_indoor_bloom", "INT_smshop_inMOD",
    "INT_smshop_outdoor_bloom", "INT_streetlighting", "INT_trailer_cinema", "id1_11_tunnel", "impexp_interior_01_lift",
    "int_amb_mult_large", "int_Barber1", "int_carmod_small", "int_carrier_control", "int_carrier_control_2",
    "int_carrier_hanger", "int_carrier_rear", "int_carrier_stair", "int_carshowroom", "int_chopshop",
    "int_clean_extlight_large", "int_clean_extlight_none", "int_clean_extlight_small", "int_ClothesHi", "int_clotheslow_large",
    "int_cluckinfactory_none", "int_cluckinfactory_small", "int_ControlTower_none", "int_ControlTower_small", "int_dockcontrol_small",
    "int_extlght_sm_cntrst", "int_extlight_large", "int_extlight_large_fog", "int_extlight_none", "int_extlight_none_dark",
    "int_extlight_none_dark_fog", "int_extlight_none_fog", "int_extlight_small", "int_extlight_small_clipped", "int_extlight_small_fog",
    "int_Farmhouse_none", "int_Farmhouse_small", "int_FranklinAunt_small", "int_GasStation", "int_hanger_none",
    "int_hanger_small", "int_Hospital_Blue", "int_Hospital_BlueB", "int_hospital_dark", "int_Hospital_DM",
    "int_hospital_small", "int_Hospital2_DM", "int_lesters", "int_Lost_none", "int_Lost_small",
    "int_methlab_small", "int_motelroom", "int_office_Lobby", "int_office_LobbyHall", "int_tattoo",
    "int_tattoo_B", "int_tunnel_none_dark", "interior_WATER_lighting", "introblue", "jewel_gas",
    "jewel_optim", "jewelry_entrance", "jewelry_entrance_INT", "jewelry_entrance_INT_fog", "Kifflom",
    "KT_underpass", "lab_none", "lab_none_dark", "lab_none_dark_fog", "lab_none_dark_OVR",
    "lab_none_exit", "lab_none_exit_OVR", "LectroDark", "LectroLight", "LIGHTSreduceFALLOFF",
    "li", "LifeInvaderLOD", "lightning", "lightning_cloud", "lightning_strong",
    "lightning_weak", "LightPollutionHills", "lightpolution", "LODmult_global_reduce", "LODmult_global_reduce_NOHD",
    "LODmult_HD_orphan_LOD_reduce", "LODmult_HD_orphan_reduce", "LODmult_LOD_reduce", "LODmult_SLOD1_reduce", "LODmult_SLOD2_reduce",
    "LODmult_SLOD3_reduce", "lodscaler", "LostTimeDark", "LostTimeFlash", "LostTimeLight",
    "maxlodscaler", "metro", "METRO_platform", "METRO_Tunnels", "METRO_Tunnels_entrance",
    "MichaelColorCode", "MichaelColorCodeBasic", "MichaelColorCodeBright", "MichaelsDarkroom", "MichaelsDirectional",
    "MichaelsNODirectional", "micheal", "micheals_lightsOFF", "michealspliff", "michealspliff_blend",
    "michealspliff_blend02", "militarybase_nightlight", "mineshaft", "morebloom", "morgue_dark",
    "morgue_dark_ovr", "Mp_apart_mid", "mp_bkr_int01_garage", "mp_bkr_int01_small_rooms", "mp_bkr_int01_transition",
    "mp_bkr_int02_garage", "mp_bkr_int02_hangout", "mp_bkr_int02_small_rooms", "mp_bkr_ware01", "mp_bkr_ware02_dry",
    "mp_bkr_ware02_standard", "mp_bkr_ware02_upgrade", "mp_bkr_ware03_basic", "mp_bkr_ware03_upgrade", "mp_bkr_ware04",
    "mp_bkr_ware05", "MP_Bull_tost", "MP_Bull_tost_blend", "MP_corona_heist", "MP_corona_heist_blend",
    "MP_corona_heist_BW", "MP_corona_heist_BW_night", "MP_corona_heist_DOF", "MP_corona_heist_night", "MP_corona_heist_night_blend",
    "MP_corona_selection", "MP_corona_switch", "MP_corona_tournament", "MP_corona_tournament_DOF", "MP_death_grade",
    "MP_death_grade_blend01", "MP_death_grade_blend02", "MP_deathfail_night", "mp_exec_office_01", "mp_exec_office_02",
    "mp_exec_office_03", "mp_exec_office_03_blue", "mp_exec_office_03C", "mp_exec_office_04", "mp_exec_office_05",
    "mp_exec_office_06", "mp_exec_warehouse_01", "MP_Garage_L", "mp_gr_int01_black", "mp_gr_int01_grey",
    "mp_gr_int01_white", "MP_H_01_Bathroom", "MP_H_01_Bedroom", "MP_H_01_New", "MP_H_01_New_Bathroom",
    "MP_H_01_New_Bedroom", "MP_H_01_New_Study", "MP_H_01_Study", "MP_H_02", "MP_H_04",
    "mp_h_05", "MP_H_06", "mp_h_07", "mp_h_08", "MP_heli_cam",
    "mp_imx_intwaremed", "mp_imx_intwaremed_office", "mp_imx_mod_int_01", "MP_intro_logo", "MP_job_end_night",
    "MP_job_load", "MP_job_load_01", "MP_job_load_02", "MP_job_lose", "MP_job_preload",
    "MP_job_preload_blend", "MP_job_preload_night", "MP_job_win", "MP_Killstreak", "MP_Killstreak_blend",
    "mp_lad_day", "mp_lad_judgment", "mp_lad_night", "MP_Loser", "MP_Loser_blend",
    "MP_lowgarage", "MP_MedGarage", "mp_nightshark_shield_fp", "MP_Powerplay", "MP_Powerplay_blend",
    "MP_race_finish", "MP_select", "mp_smg_int01_han", "mp_smg_int01_han_blue", "mp_smg_int01_han_red",
    "mp_smg_int01_han_yellow", "Mp_Stilts", "Mp_Stilts_gym", "Mp_Stilts_gym2", "Mp_Stilts2",
    "Mp_Stilts2_bath", "MP_Studio_Lo", "mp_x17dlc_base", "mp_x17dlc_base_dark", "mp_x17dlc_base_darkest",
    "mp_x17dlc_facility", "mp_x17dlc_facility_conference", "mp_x17dlc_facility2", "mp_x17dlc_in_sub", "mp_x17dlc_in_sub_no_reflection",
    "mp_x17dlc_int_01", "mp_x17dlc_int_01_tint1", "mp_x17dlc_int_01_tint2", "mp_x17dlc_int_01_tint3", "mp_x17dlc_int_01_tint4",
    "mp_x17dlc_int_01_tint5", "mp_x17dlc_int_01_tint6", "mp_x17dlc_int_01_tint7", "mp_x17dlc_int_01_tint8", "mp_x17dlc_int_01_tint9",
    "mp_x17dlc_int_02", "mp_x17dlc_int_02_hangar", "mp_x17dlc_int_02_tint1", "mp_x17dlc_int_02_tint2", "mp_x17dlc_int_02_tint3",
    "mp_x17dlc_int_02_tint4", "mp_x17dlc_int_02_tint5", "mp_x17dlc_int_02_tint6", "mp_x17dlc_int_02_tint7", "mp_x17dlc_int_02_tint8",
    "mp_x17dlc_int_02_tint9", "mp_x17dlc_int_silo", "mp_x17dlc_int_silo_escape", "mp_x17dlc_lab", "mp_x17dlc_lab_loading_bay",
    "MPApart_H_01", "MPApart_H_01_gym", "MPApartHigh", "MPApartHigh_palnning", "mugShot",
    "mugShot_lineup", "Multipayer_spectatorCam", "multiplayer_ped_fight", "nervousRON_fog", "NeutralColorCode",
    "NeutralColorCodeBasic", "NeutralColorCodeBright", "NeutralColorCodeLight", "NEW_abattoir", "new_bank",
    "NEW_jewel", "NEW_jewel_EXIT", "NEW_lesters", "new_MP_Garage_L", "NEW_ornate_bank",
    "NEW_ornate_bank_entrance", "NEW_ornate_bank_office", "NEW_ornate_bank_safe", "New_sewers", "NEW_shrinksOffice",
    "NEW_station_unfinished", "new_stripper_changing", "NEW_trevorstrailer", "NEW_tunnels", "NEW_tunnels_ditch",
    "new_tunnels_entrance", "NEW_tunnels_hole", "NEW_yellowtunnels", "NewMicheal", "NewMicheal_night",
    "NewMicheal_upstairs", "NewMichealgirly", "NewMichealstoilet", "NewMichealupstairs", "nextgen",
    "NG_blackout", "NG_deathfail_BW_base", "NG_deathfail_BW_blend01", "NG_deathfail_BW_blend02", "NG_filmic01",
    "NG_filmic02", "NG_filmic03", "NG_filmic04", "NG_filmic05", "NG_filmic06",
    "NG_filmic07", "NG_filmic08", "NG_filmic09", "NG_filmic10", "NG_filmic11",
    "NG_filmic12", "NG_filmic13", "NG_filmic14", "NG_filmic15", "NG_filmic16",
    "NG_filmic17", "NG_filmic18", "NG_filmic19", "NG_filmic20", "NG_filmic21",
    "NG_filmic22", "NG_filmic23", "NG_filmic24", "NG_filmic25", "NG_filmnoir_BW01",
    "NG_filmnoir_BW02", "NG_first", "nightvision", "NO_coronas", "NO_fog_alpha",
    "NO_streetAmbient", "NO_weather", "NoAmbientmult", "NoAmbientmult_interior", "NOdirectLight",
    "NoPedLight", "NOrain", "overwater", "Paleto", "paleto_nightlight",
    "paleto_opt", "PennedInDark", "PennedInLight", "PERSHING_water_reflect", "phone_cam",
    "phone_cam1", "phone_cam10", "phone_cam11", "phone_cam12", "phone_cam13",
    "phone_cam2", "phone_cam3", "phone_cam3_REMOVED", "phone_cam4", "phone_cam5",
    "phone_cam6", "phone_cam7", "phone_cam8", "phone_cam8_REMOVED", "phone_cam9",
    "plane_inside_mode", "player_transition", "player_transition_no_scanlines", "player_transition_scanlines", "PlayerSwitchNeutralFlash",
    "PlayerSwitchPulse", "plaza_carpark", "PoliceStation", "PoliceStationDark", "polluted",
    "poolsidewaterreflection2", "PORT_heist_underwater", "powerplant_nightlight", "powerstation", "PPFilter",
    "PPGreen01", "PPGreen02", "PPOrange01", "PPOrange02", "PPPink01",
    "PPPink02", "PPPurple01", "PPPurple02", "prison_nightlight", "projector",
    "prologue", "prologue_ending_fog", "prologue_ext_art_amb", "prologue_reflection_opt", "prologue_shootout",
    "Prologue_shootout_opt", "pulse", "RaceTurboDark", "RaceTurboFlash", "RaceTurboLight",
    "ranch", "REDMIST", "REDMIST_blend", "ReduceDrawDistance", "ReduceDrawDistanceMAP",
    "ReduceDrawDistanceMission", "reducelightingcost", "ReduceSSAO", "reducewaterREF", "refit",
    "reflection_correct_ambient", "RemoteSniper", "resvoire_reflection", "rply_brightness", "rply_brightness_neg",
    "rply_contrast", "rply_contrast_neg", "rply_motionblur", "rply_saturation", "rply_saturation_neg",
    "rply_vignette", "rply_vignette_neg", "SALTONSEA", "sandyshore_nightlight", "SAWMILL",
    "scanline_cam", "scanline_cam_cheap", "scope_zoom_in", "scope_zoom_out", "secret_camera",
    "services_nightlight", "shades_pink", "shades_yellow", "SheriffStation", "ship_explosion_underwater",
    "ship_lighting", "Shop247", "Shop247_none", "sleeping", "Sniper",
    "SP1_03_drawDistance", "spectator1", "spectator10", "spectator2", "spectator3",
    "spectator4", "spectator5", "spectator6", "spectator7", "spectator8",
    "spectator9", "StadLobby", "stc_coroners", "stc_deviant_bedroom", "stc_deviant_lounge",
    "stc_franklinsHouse", "stc_trevors", "stoned", "stoned_aliens", "stoned_cutscene",
    "stoned_monkeys", "StreetLighting", "StreetLightingJunction", "StreetLightingtraffic", "STRIP_changing",
    "STRIP_nofog", "STRIP_office", "STRIP_stage", "StuntFastDark", "StuntFastLight",
    "StuntSlowDark", "StuntSlowLight", "subBASE_water_ref", "sunglasses", "superDARK",
    "switch_cam_1", "switch_cam_2", "telescope", "TinyGreen01", "TinyGreen02",
    "TinyPink01", "TinyPink02", "TinyRacerMoBlur", "torpedo", "traffic_skycam",
    "trailer_explosion_optimise", "TREVOR", "TrevorColorCode", "TrevorColorCodeBasic", "TrevorColorCodeBright",
    "Trevors_room", "trevorspliff", "trevorspliff_blend", "trevorspliff_blend02", "Tunnel",
    "tunnel_entrance", "tunnel_entrance_INT", "TUNNEL_green", "TUNNEL_green_ext", "Tunnel_green1",
    "tunnel_id1_11", "TUNNEL_orange", "TUNNEL_orange_exterior", "TUNNEL_white", "TUNNEL_yellow",
    "TUNNEL_yellow_ext", "ufo", "ufo_deathray", "underwater", "underwater_deep",
    "underwater_deep_clear", "v_abattoir", "V_Abattoir_Cold", "v_bahama", "v_cashdepot",
    "V_CIA_Facility", "v_dark", "V_FIB_IT3", "V_FIB_IT3_alt", "V_FIB_IT3_alt5",
    "V_FIB_stairs", "v_foundry", "v_janitor", "v_jewel2", "v_metro",
    "V_Metro_station", "V_Metro2", "v_michael", "v_michael_lounge", "V_Office_smoke",
    "V_Office_smoke_ext", "V_Office_smoke_Fire", "v_recycle", "V_recycle_dark", "V_recycle_light",
    "V_recycle_mainroom", "v_rockclub", "V_Solomons", "V_strip_nofog", "V_strip_office",
    "v_strip3", "v_strpchangerm", "v_sweat", "v_sweat_entrance", "v_sweat_NoDirLight",
    "v_torture", "Vagos", "vagos_extlight_small", "VAGOS_new_garage", "VAGOS_new_hangout",
    "VagosSPLASH", "VC_tunnel_entrance", "vehicle_subint", "venice_canal_tunnel", "vespucci_garage",
    "VolticBlur", "VolticFlash", "VolticGold", "WAREHOUSE", "WATER _lab_cooling",
    "WATER_CH2_06_01_03", "WATER_CH2_06_02", "WATER_CH2_06_04", "WATER_cove", "WATER_hills",
    "WATER_ID2_21", "WATER_lab", "WATER_lab_cooling", "WATER_militaryPOOP", "WATER_muddy",
    "WATER_port", "WATER_REF_malibu", "WATER_refmap_high", "WATER_refmap_hollywoodlake", "WATER_refmap_low",
    "WATER_refmap_med", "WATER_refmap_off", "WATER_refmap_poolside", "WATER_refmap_silverlake", "WATER_refmap_venice",
    "WATER_refmap_verylow", "WATER_resevoir", "WATER_RichmanStuntJump", "WATER_river", "WATER_salton",
    "WATER_salton_bottom", "WATER_shore", "WATER_silty", "WATER_silverlake", "WeaponUpgrade",
    "whitenightlighting", "WhiteOut", "winning_room", "yacht_DLC", "yell_tunnel_nodirect"
];

function showSubtitle(text) {
    game.beginTextCommandPrint('STRING');
    game.addTextComponentSubstringPlayerName(text);
    game.endTextCommandPrint(100 * text.length, true);
}

function changeStrength(amount) {
    modifierStrength += amount;
    modifierStrength = (modifierStrength < 0.0) ? 0.0 : (modifierStrength > 1.0) ? 1.0 : modifierStrength;
    game.setTimecycleModifierStrength(modifierStrength);
    showSubtitle(`Timecycle modifier strength: ~b~${modifierStrength.toFixed(2)}`, 3000);
}

let modifierMenu = new Menu("Timecycle Modifiers", "", new Point(950, 300));
modifierMenu.Visible = false;

modifierMenu.ItemSelect.on((item, index) => {
    if (index == 0) {
        game.clearTimecycleModifier();
        showSubtitle("Timecycle modifier cleared.", 3000);
    } else {
        game.setTimecycleModifier(item.Text);
        game.setTimecycleModifierStrength(modifierStrength);
        showSubtitle(`Timecycle modifier: ~b~${item.Text} (Strength: ${modifierStrength.toFixed(2)})`, 3000);
    }

    if (lastSelectedItem > -1) modifierMenu.MenuItems[lastSelectedItem].SetRightLabel("");
    if (index > 0) item.SetRightLabel("Current");
    lastSelectedItem = index;
});

let clearItem = new UIMenuItem("Clear Modifier", "");
clearItem.BackColor = new Color(93, 182, 229);
modifierMenu.AddItem(clearItem);

for (let i = 0; i < modifiers.length; i++) {
    modifierMenu.AddItem(new UIMenuItem(modifiers[i], ""));
}

alt.on('keydown', (key) => {
    if (key == 33) {
        changeStrength(0.05);
    }
});

alt.on('keydown', (key) => {
    if (key == 34) {
        changeStrength(-0.05);
    }
});

alt.on('keydown', (key) => {
    if (key == 120) {
        modifierMenu.Visible = !modifierMenu.Visible
    }
});