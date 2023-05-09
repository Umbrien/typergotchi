import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconBuildingStore, IconBrandGithub } from "@tabler/icons-react";
import useAuth from "@wasp/auth/useAuth";
import logout from "@wasp/auth/logout";
import "./Main.css";
import { useKeyPress } from "./hooks/useKeyPress";
import { Link } from "react-router-dom";

const bucketUrl =
  // @ts-ignore
  import.meta.env.REACT_APP_BUCKET_URL ||
  "https://r2.typergotchi.win/typergotchi/";

function ModeButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="mx-2 rounded border border-yellow-500 px-4 py-2 text-yellow-500 transition hover:bg-yellow-200 hover:text-yellow-800"
      to={href}
    >
      {children}
    </Link>
  );
}

const MainPage = () => {
  const { data: user } = useAuth();
  console.log(user);
  const history = useHistory();

  const { key } = useKeyPress();

  useEffect(() => {
    if (key === "s" || key === "S") {
      history.push("/solo-mode");
    }
    if (key === "t" || key === "T") {
      alert("Story mode is not implemented yet");
    }
    if (key === "p" || key === "P") {
      alert("PvP mode is not implemented yet");
    }
  }, [key]);

  useEffect(() => {
    if (user && !(user.nickname && user.daBoiSelectedSkinId)) {
      history.push("/signup-stage-2");
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <nav className="flex justify-end p-4">
        <div className="flex w-min gap-4">
          <a
            className="text-yellow-800 transition hover:-rotate-6 hover:text-yellow-400"
            href="#"
          >
            <IconBuildingStore size={24} />
          </a>
          <a
            className="text-yellow-800 transition hover:-rotate-6 hover:text-yellow-400"
            href="https://github.com/Umbrien/typergotchi"
            rel="noreferrer"
            target="_blank"
          >
            <IconBrandGithub size={24} />
          </a>
        </div>
      </nav>
      <main className="">
        <div className="flex flex-col justify-center md:flex-row">
          <div>
            <img
              className="h-96"
              src={
                bucketUrl +
                (user?.daBoiHappyImg ?? "generatedBoiz/2-happy-5.png")
              }
              alt="Da Boi"
            />
          </div>
          <div className="flex flex-col justify-around">
            <div>
              <h1 className="text-5xl font-bold text-yellow-500">
                TyperG<span className="animate-pulse">o</span>
                <span className="text-yellow-200">tchi</span>
              </h1>
              <p className="text-yellow-500">
                Welcome, {user?.nickname ?? "$user"}!
                {!user?.nickname ? (
                  <Link
                    to="/signup"
                    className="rounded px-2 py-1 text-sm underline hover:text-yellow-700"
                  >
                    sign up
                  </Link>
                ) : (
                  <button
                    className="rounded px-2 py-1 text-sm hover:text-yellow-700"
                    onClick={logout}
                  >
                    logout
                  </button>
                )}
              </p>
            </div>
            <div className="flex h-1/2 w-fit flex-col gap-3">
              <ModeButton href="solo-mode">🐝 [S]olo mode</ModeButton>
              <ModeButton href="#">🐞 S[T]ory mode</ModeButton>
              <ModeButton href="#">⚔️ Pv[P] mode</ModeButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MainPage;
