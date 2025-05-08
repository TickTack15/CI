const actions  = {};

export function registerAction(actionName, handler) {
  actions [actionName] = handler;
  console.log(`Registered handler for action "${actionName}"`);
}

export function triggerAction(name, ...args) {
  if (actions[name]) {
    actions[name](...args)
  } else {
    console.warn(`No handler for action "${name}"`);
    return null;
  }
}
