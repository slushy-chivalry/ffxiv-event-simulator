import ALL_SKILLS from './skills.json';

export const SKILLS = ALL_SKILLS.dancer;

/** Simple discrete event simulator. */

// scheduling global cooldown weaponskills
const globalCooldown = 2.5;

// scheduling instant cast events
const reactionTime = 0.01;

const initialState = {
  globalCooldownRemaining: 0,
  numFeathers: 0,
  esprit: 0,
  procReverseCascade: false,
  procFountainFall: false,
};

// returns array of events
export function simulate(duration, initialActionId) {
  let state = initialState;
  const queue = [[0, initialActionId]];
  const log = [];
  while (queue.length > 0) {
    const action = queue.shift();
    if (action[0] > duration) break;
    state = nextState(action, state);
    queue.push(...nextActions(action, state));
    log.push(action);
  }
  return log;
}

// returns modified state based on execution of the current action
function nextState([t, actionId], state) {
  const action = SKILLS[actionId];
  switch (action.name) {
    case 'Cascade':
      return { ...state, globalCooldownRemaining: globalCooldown };
    case 'Fountain':
      return { ...state, globalCooldownRemaining: globalCooldown };
    default:
      return state;
  }
  return state;
}

// returns next set of actions scheduled
function nextActions([t, actionId], state) {
  const action = SKILLS[actionId];
  switch (action.name) {
    case 'Cascade':
      return Math.random() < 0.5
             ? [[t + reactionTime, '3'], [t + reactionTime + state.globalCooldownRemaining, '2']]
             : [[t + state.globalCooldownRemaining, '2']];
    case 'Fountain':
      return Math.random() < 0.5
             ? [[t + reactionTime, '4'], [t + reactionTime + state.globalCooldownRemaining, '1']]
             : [[t + state.globalCooldownRemaining, '1']];
    default:
      return [];
  }
  return [];
}


/*

   in the beginning, the actions are empty

   state keeps track of cooldowns

   maybe cooldown reset event?

   how to incorporate state???

   keeping track of your gauges

   (t, cascade)

   if proc'd -> (t + globalCooldown, reverse cascade)
   else      -> (t + globalCooldown, fountain)


   (t, reverse cascade)
   if proc'd (t + reactionTime, fan dance)
   (t + globalCooldown, fountain)

   (t, fountain)

   if proc'd -> (t + globalCooldown, fountainfall)
   else      -> (t + globalCooldown, cascade)



scheduling vs. executing ???


// current action
//

// schedule multiple actions in advance

*/

/*

   good heuristic for this???

   possible


*/
