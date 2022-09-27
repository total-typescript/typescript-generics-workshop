import { Equal, Expect } from "../helpers/type-utils";

function returnWhatIPassIn(t: 1): 1;
function returnWhatIPassIn(t: "matt"): "matt";
function returnWhatIPassIn(t: unknown) {
  return t;
}

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];
