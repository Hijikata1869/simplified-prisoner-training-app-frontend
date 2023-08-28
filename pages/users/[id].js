import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import {
  fetchCurrentUser,
  fetchUser,
  getAllUserIds,
  deleteUser,
} from "../../lib/users";
import { fetchUserTrainingLogs } from "../../lib/training-logs";
import { deleteTrainingLog } from "../../lib/training-logs";
import { loggedIn } from "../../lib/sessions";

import Layout from "../../components/Layout";
import CheckDialog from "../../components/CheckDialog";
import SuccessAlert from "../../components/SuccessAlert";
import FailedAlert from "../../components/FailedAlert";

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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserTrainingLogs({ userData, userTrainingLogsData }) {
  const router = useRouter();
  const { id } = router.query;
  const { user } = userData;
  const [currentUser, setCurrentUser] = useState([]);
  const [trainingMenu, setTrainingMenu] = useState("プッシュアップ");
  const [step, setStep] = useState("ステップ１");
  const [reps, setReps] = useState("１回");
  const [sets, setSets] = useState("１セット");
  const [memo, setMemo] = useState("");
  const [modalConfig, setModalConfig] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [failedAlertOpen, setFailedAlertOpen] = useState(false);
  const [postAlertOpen, setPostAlertOpen] = useState(false);
  const [postFailedAlertOpen, setPostFailedAlertOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const stepsArr = makeSteps();
  const repsArr = makeReps();
  const setsArr = makeSets();

  const {
    data: { userTrainingLogs },
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${user.id}/training_logs`,
    fetcher,
    {
      fallbackData: userTrainingLogsData,
    }
  );

  useEffect(() => {
    fetchCurrentUser()
      .then((res) => {
        return res.currentUser;
      })
      .then((data) => {
        setCurrentUser(data.currentUser);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loggedIn()
      .then((res) => {
        setIsLogin(res.loggedIn);
      })
      .catch((err) => {
        console.error(err);
      });
  });

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
      ).then((res) => {
        if (res.status === 200) {
          setPostAlertOpen(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setPostFailedAlertOpen(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const hundleDeleteClick = async (userId, trainingLogId) => {
    setDialogOpen(true);
    const ret = await new Promise((resolve) => {
      setModalConfig({
        promiseResolve: resolve,
        setIsOpen: setDialogOpen,
      });
    });
    if (ret === "ok") {
      try {
        await deleteTrainingLog(userId, trainingLogId).then((res) => {
          if (res.status === 200) {
            setDialogOpen(false);
            setDeleteAlertOpen(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setDialogOpen(false);
            setFailedAlertOpen(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const hundleDeleteAccount = async (userId) => {
    setDialogOpen(true);
    const ret = await new Promise((resolve) => {
      setModalConfig({
        promiseResolve: resolve,
        setIsOpen: setDialogOpen,
      });
    });
    if (ret === "ok") {
      try {
        await deleteUser(userId).then((res) => {
          if (res.status === 200) {
            router.push("/");
          }
        });
      } catch {
        setDialogOpen(false);
        setFailedAlertOpen(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {dialogOpen && <CheckDialog modalConfig={modalConfig} />}
      <Layout title={`${user.name}さんのトレーニング記録`}>
        {postAlertOpen ? (
          <SuccessAlert
            message="トレーニングを記録しました"
            setAlertOpen={setPostAlertOpen}
          />
        ) : null}
        {deleteAlertOpen ? (
          <SuccessAlert
            message="トレーニングを１件削除しました"
            setAlertOpen={setDeleteAlertOpen}
          />
        ) : null}
        {postFailedAlertOpen ? (
          <FailedAlert
            message="記録できませんでした"
            setAlertOpen={setPostFailedAlertOpen}
          />
        ) : null}
        {failedAlertOpen ? (
          <FailedAlert
            message="削除できませんでした"
            setAlertOpen={setFailedAlertOpen}
          />
        ) : null}
        <div className="lg:w-96">
          {user.id === currentUser?.id ? (
            <>
              <h1 className="mb-6 font-bold text-2xl">
                トレーニングを記録する
              </h1>
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
                  className="bg-indigo-500  px-2 py-2 mt-10 w-full text-white rounded-md"
                  onClick={(e) => postTrainingLogAction(e)}
                >
                  送信
                </button>
              </div>
            </>
          ) : null}
          <div>
            <h1 className="font-bold text-2xl">{`${user.name}さんのトレーニング記録`}</h1>
            {userTrainingLogs?.length ? (
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
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">メモ</p>
                      <p>{`${trainingLog.memo}`}</p>
                    </div>
                    {currentUser.id === trainingLog.user_id ? (
                      <div className="flex justify-center">
                        <button
                          className="mt-2 inline-flex w-auto rounded-md bg-red-500 text-sm text-white px-3 py-2 shadow-sm hover:bg-red-400"
                          onClick={() =>
                            hundleDeleteClick(
                              trainingLog.user_id,
                              trainingLog.id
                            )
                          }
                        >
                          削除する
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p className="pt-4">トレーニング記録はありません</p>
            )}
          </div>
          {Number(id) === currentUser.id ? (
            <div className="mt-20">
              <div className="flex justify-center">
                <button
                  className="border mt-2 w-auto rounded-md border-red-500 bg-white text-sm text-red-500 px-3 py-2 shadow-sm hover:bg-red-500 hover:text-white"
                  onClick={() => hundleDeleteAccount(currentUser.id)}
                >
                  このアカウントを削除する
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Layout>
    </>
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
    props: { userData, userTrainingLogsData, revalidate: 3 },
  };
}
