import AddExistingClaim from "./lib/AddExistingClaim";
import { AddNewClaim } from "./lib/AddNewClaim";
import ClaimExtension from "./lib/Extension";

export const FactCheck = {
  extensionList: { ClaimExtension },
  extensionUI: { AddExistingClaim, AddNewClaim },
};

export default FactCheck;
