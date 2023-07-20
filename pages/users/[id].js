import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Cookie from "universal-cookie";

import { fetchCurrentUser, fetchUser, getAllUserIds } from "../../lib/users";
import { fetchUserTrainingLogs } from "../../lib/training-logs";

import Layout from "../../components/Layout";

const cookie = new Cookie();

const trainingMenusArr = [
  "プッシュアップ",
  "スクワット",
  "プルアップ",
  "レッグレイズ",
  "ブリッジ",
  "ハンドスタンドプッシュアップ",
];

const makeSteps = () => {
  let array = [];
  for (let i = 1; i < 11; i++) {
    array.push(String(`ステップ${i}`));
  }
  return array;
};

const makeReps = () => {
  let array = [];
  for (let i = 1; i < 51; i++) {
    array.push(String(`${i}回`));
  }
  return array;
};

const makeSets = () => {
  let array = [];
  for (let i = 1; i < 11; i++) {
    array.push(String(`${i}セット`));
  }
  return array;
};

export default function UserTrainingLogs({ userData, userTrainingLogsData }) {
  const router = useRouter();
  const { id } = router.query;
  const { user } = userData;
  const { userTrainingLogs } = userTrainingLogsData;
  const [currentUser, setCurrentUser] = useState([]);
  const [trainingMenu, setTrainingMenu] = useState("プッシュアップ");
  const [step, setStep] = useState("ステップ１");
  const [reps, setReps] = useState("１回");
  const [sets, setSets] = useState("１セット");
  const [memo, setMemo] = useState("");
  const stepsArr = makeSteps();
  const repsArr = makeReps();
  const setsArr = makeSets();

  useEffect(() => {
    fetchCurrentUser(cookie.get("session_id"))
      .then((res) => {
        return res.currentUser;
      })
      .then((data) => {
        setCurrentUser(data.current_user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const hundleValueChange = (e) => {
    switch (e.target.id) {
      case "trainingMenu":
        setTrainingMenu(e.target.value);
        break;
      case "step":
        setStep(e.target.value);
        break;
      case "reps":
        setReps(e.target.value);
        break;
      case "sets":
        setSets(e.target.value);
        break;
      case "memo":
        setMemo(e.target.value);
        break;
    }
  };

  const postTrainingLogAction = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RAILSAPI_URL}/users/${user.id}/training_logs`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id: user.id,
            training_menu: trainingMenu,
            step: step,
            repetition: reps,
            set: sets,
            memo: memo,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout title={`${user.name}さんのトレーニング記録`}>
      <div className="lg:w-96">
        {user.id === currentUser.id ? (
          <>
            <h1 className="mb-6 font-bold text-2xl">トレーニングを記録する</h1>
            <div className="pb-20">
              <label
                htmlFor="trainingMenu"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                トレーニングメニュー
              </label>
              <select
                id="trainingMenu"
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={trainingMenu}
                onChange={hundleValueChange}
              >
                {trainingMenusArr.map((trainingMenu, index) => {
                  return (
                    <option
                      key={index}
                      value={trainingMenu}
                    >{`${trainingMenu}`}</option>
                  );
                })}
              </select>
              <label
                htmlFor="step"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ステップ
              </label>
              <select
                id="step"
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={step}
                onChange={hundleValueChange}
              >
                {stepsArr.map((step, index) => {
                  return (
                    <option key={index} value={`${step}`}>{`${step}`}</option>
                  );
                })}
              </select>
              <label
                htmlFor="reps"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                回数
              </label>
              <select
                id="reps"
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={reps}
                onChange={hundleValueChange}
              >
                {repsArr.map((rep, index) => {
                  return <option key={index} value={rep}>{`${rep}`}</option>;
                })}
              </select>
              <label
                htmlFor="sets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                セット数
              </label>
              <select
                id="sets"
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={sets}
                onChange={hundleValueChange}
              >
                {setsArr.map((set, index) => {
                  return (
                    <option key={index} value={`${set}`}>{`${set}`}</option>
                  );
                })}
              </select>
              <label
                htmlFor="memo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                一言メモ
              </label>
              <div className="mt-2">
                <textarea
                  id="memo"
                  rows="3"
                  className="bg-gray-50 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={memo}
                  onChange={hundleValueChange}
                ></textarea>
              </div>
              <button
                className="bg-indigo-500  px-4 py-4 mt-10 w-full text-white rounded-md"
                onClick={(e) => postTrainingLogAction(e)}
              >
                送信
              </button>
            </div>
          </>
        ) : null}
        <div>
          <h1 className="font-bold text-2xl">{`${user.name}さんのトレーニング記録`}</h1>
          {userTrainingLogs.length ? (
            userTrainingLogs.map((trainingLog, index) => {
              return (
                <div key={index} className="flex flex-col p-4 w-80">
                  <div className="flex justify-center my-4 border-t border-gray-400 pt-2">
                    <p className="px-1 text-lg">{`${trainingLog.training_menu}`}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">ステップ</p>
                      <p className="">{`${trainingLog.step}`}</p>
                    </div>
                    <div className="mb-2 mr-5">
                      <p className="text-xs text-gray-500">回数</p>
                      <p>{`${trainingLog.repetition}`}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">セット数</p>
                      <p>{`${trainingLog.set}`}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">メモ</p>
                    <p>{`${trainingLog.memo}`}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>トレーニング記録はありません</p>
          )}
        </div>
        <div>
          <button
            className="bg-gray-500 p-10"
            onClick={() => console.log(userTrainingLogs)}
          >
            PROPS
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllUserIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { user: userData } = await fetchUser(params.id);
  const { userTrainingLogs: userTrainingLogsData } =
    await fetchUserTrainingLogs(params.id);

  return {
    props: { userData, userTrainingLogsData },
  };
}
