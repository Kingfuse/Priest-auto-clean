'use strict'


/**
 * Creates a skill object with the specified skill id and the location of the player.
 * @param skill_id
 * @param player_location
 * @returns {{loc: *, unk: boolean, continue: boolean, unk2: boolean, skill: {npc: boolean, reserved: number, huntingZoneId: number, id, type: number}, w: *, dest: *, moving: boolean, target: number}}
 */
function create_skill(skill_id, player_location) {
    return {
        skill: {
            id: skill_id,
            reserved: 0,
            npc: false,
            type: 1,
            huntingZoneId: 0
        },
        w: player_location.w,
        loc: player_location.loc,
        dest: player_location.loc,
        unk: true,
        moving: true,
        continue: false,
        target: 0,
        unk2: false
    }
}

function buff(mod, player_location, delay_ms, skill_id) {
    setTimeout(
        () => {
            mod.send('C_START_SKILL', 7, create_skill(skill_id, player_location));
        }, delay_ms);
}


module.exports = function PriestAutoSkill(mod) {
    let player_location = {};
    const {command} = mod.require
    let start = false;

    command.add('br', () => {
        command.message("Current state: " + start.toString());
        start = !start;
        command.message("New state: " + start.toString());
    });

    mod.hook('C_PLAYER_LOCATION', 5, (event) => {
        player_location.loc = event.loc;
        player_location.w = event.w;

        if (start) {
            buff(mod, player_location, 200, 100100);   //180101
        }
    });
}
