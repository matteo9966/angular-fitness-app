interface ActionCreator<T>{
  type: T;
}

interface ActionCreatorWithPayload<T,P> extends ActionCreator<T> {
  (payload: P): { type: T; payload: P };
}

export function createAction<T>(type: T): ActionCreator<T>;
export function createAction<T,P>(
  type: T
): ActionCreatorWithPayload<T,P>;

export function createAction<T,P>(type: T) {
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

