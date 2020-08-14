import { Operation } from "apollo-boost";
import store from "@/store";
import { MutationTypes } from "@/store/mutation-types";
import { GraphQLError } from "graphql";
import { ServerParseError, ServerError } from "apollo-link-http-common";

const setAuth = (operation: Operation) => {
  if (!localStorage.token) {
    localStorage.setItem("token", "");
  }
  operation.setContext({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

const formatErrors = ({
  graphQLErrors,
  networkError
}: {
  graphQLErrors: readonly GraphQLError[] | undefined;
  networkError: Error | ServerError | ServerParseError | undefined;
}) => {
  if (networkError) {
    console.log("[NETWORK ERROR]", networkError);
  }
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.dir(err);
      if (err.name === "AuthenticationError") {
        console.warn(err);
        store.commit(MutationTypes.SET_AUTH_ERROR, err);
        store.dispatch("logout");
      }
    }
  }
};

export { setAuth, formatErrors };
