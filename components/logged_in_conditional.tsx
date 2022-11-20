import Session from "supertokens-auth-react/recipe/session";

export default function LoggedInConditional(props: any) {
  let sessionContext = Session.useSessionContext();
  if (sessionContext.loading) {
    return null;
  }
  if (sessionContext.doesSessionExist) {
    return props.ifTrue || null;
  } else {
    return props.ifFalse || null;
  }
  return null;
}
