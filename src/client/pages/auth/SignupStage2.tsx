import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@wasp/queries";
import { useMutation } from "@tanstack/react-query";
import fetchDaBoiSkins from "@wasp/queries/fetchDaBoiSkins";
import registerStep2 from "@wasp/actions/registerStep2";
import HttpError from "../../../../.wasp/out/server/src/core/HttpError";

export function SignupStage2() {
  const history = useHistory();

  const { data: daBoiSkins } = useQuery(fetchDaBoiSkins);

  const registerStep2Mutation = useMutation({
    mutationFn: registerStep2,
    onSuccess: (user) => {
      setIsNicknameUsed(false);
      setNicknameError(false);
      setSelectedSkinIdError(false);
      history.push("/");
    },
    onError: (err: HttpError) => {
      if (err.statusCode === 409) {
        setNicknameError(false);
        setIsNicknameUsed(true);
      } else {
        throw err;
      }
    },
  });

  const [nickname, setNickname] = useState("");
  const [nickNameError, setNicknameError] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedSkinId, setSelectedSkinId] = useState<number | null>(null);
  const [selectedSkinIdError, setSelectedSkinIdError] = useState(false);
  const [isNicknameUsed, setIsNicknameUsed] = useState(false);

  function handleSkinClick(skinId: number) {
    setSelectedSkinId((id) => (id === skinId ? null : skinId));
  }

  async function handleFinishSignupClick() {
    const nickNameIsValid = nickname.length > 0;
    const selectedSkinIdIsValid = selectedSkinId !== null;

    setNicknameError(!nickNameIsValid);
    setSelectedSkinIdError(!selectedSkinIdIsValid);

    if (nickNameIsValid && selectedSkinIdIsValid) {
      registerStep2Mutation.mutate({
        nickname,
        description: bio,
        daBoiSelectedSkinId: selectedSkinId,
      });
    }
  }

  return (
    <div className="h-full w-full bg-white">
      <div className="flex min-h-[75vh] min-w-full items-center justify-center">
        <div className="h-full w-full max-w-sm bg-white p-5">
          <div className="flex flex-col">
            <h1>Signup: stage 2</h1>
            <p>
              Now, let's fill in additional info{" "}
              <span className="rounded-full bg-yellow-400 p-3 font-mono">
                ={"}"}
              </span>
            </p>

            <label className="my-1 block">
              <span className="text-gray-700">Nickname</span>
              <input
                type="text"
                value={nickname}
                onInput={(e) => setNickname(e.currentTarget.value)}
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100
                    focus:border-yellow-500 focus:bg-white focus:ring-0"
                placeholder=""
              />
              {nickNameError && (
                <span className="text-sm text-red-700">
                  Come on, fill in cool nickname
                </span>
              )}
              {isNicknameUsed && (
                <span className="text-sm text-red-700">
                  This nickname is already used
                </span>
              )}
            </label>

            <label className=" my-1 block">
              <span className="text-gray-700">Bio</span>
              <textarea
                value={bio}
                onInput={(e) => setBio(e.currentTarget.value)}
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

            {daBoiSkins && (
              <div className="my-4 flex flex-col">
                <span className="self-center text-gray-700">
                  Choose your da boi
                </span>
                {selectedSkinIdError && (
                  <span className="text-sm text-red-700">
                    Choose your boi, really
                  </span>
                )}
                <div className="my-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {daBoiSkins.map(({ id, img, name }) => (
                    <div
                      className={`flex flex-col items-center rounded-md border border-yellow-400 p-3 ${
                        selectedSkinId === id ? "bg-yellow-50" : ""
                      } transition hover:rounded-xl hover:bg-yellow-50 active:bg-yellow-100`}
                      key={`daboi-skin-${id}`}
                      onClick={() => handleSkinClick(id)}
                    >
                      <img src={img} alt={name} />
                      <span className="ml-2">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="self-end rounded-md bg-yellow-50 px-4 py-2 transition hover:rounded-lg hover:bg-yellow-100 active:bg-yellow-200"
              onClick={handleFinishSignupClick}
            >
              Finish signup
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
