interface ActionCreator{
  type: string;
}

interface ActionCreatorWithPayload<P> extends ActionCreator {
  (payload: P): { type: string; payload: P };
}

export function createAction(type: string): ActionCreator;
export function createAction<P>(
  type: string
): ActionCreatorWithPayload<P>;

export function createAction<P>(type: string) {
  const creator = (payload: P) => ({
    type,
    payload,
  });
  creator.type = type; //assigning property to function
  return creator;
}

/* USAGE EXAMPLE:  */
// const UPDATE_EXERCISE = '[EXERCISE] update exercise' as const;
// const updateExercise = createAction<{}>(UPDATE_EXERCISE);

// updateExercise({})

