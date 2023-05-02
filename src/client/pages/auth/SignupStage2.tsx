import { useQuery } from "@wasp/queries";
import fetchDaBoiSkins from "@wasp/queries/fetchDaBoiSkins";

export function SignupStage2() {
  const { data: daBoiSkins } = useQuery(fetchDaBoiSkins);

  return (
    <div className="h-full w-full bg-white">
      <div className="flex min-h-[75vh] min-w-full items-center justify-center">
        <div className="h-full w-full max-w-sm bg-white p-5">
          <div>
            <h1>Signup: stage 2</h1>
            <p>
              Now, let's fill in additional info{" "}
              <span className="rounded-full bg-yellow-400 p-3 font-mono">
                ={"}"}
              </span>
            </p>

            <label className="block">
              <span className="text-gray-700">Nickname</span>
              <input
                type="text"
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-transparent
                    bg-gray-100
                    focus:border-yellow-500 focus:bg-white focus:ring-0
                  "
                placeholder=""
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Bio</span>
              <textarea
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-transparent
                    bg-gray-100
                    focus:border-yellow-500 focus:bg-white focus:ring-0
                  "
                rows={3}
              ></textarea>
            </label>

            {daBoiSkins &&
              // @ts-ignore
              daBoiSkins.map(({ id, img, name }) => (
                <div className="flex items-center" key={`daboi-skin-${id}`}>
                  <img src={img} alt={name} className="h-10 w-10" />
                  <span className="ml-2">{name}</span>
                </div>
              ))}

            <span className="text-sm font-medium text-gray-900">
              I already have an account (I don't).
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
