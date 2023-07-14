import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { fetchUser, getAllUserIds } from "../../lib/users";

import Layout from "../../components/Layout";

export default function UserTrainingLogs({ userData }) {
  const router = useRouter();
  const { id } = router.query;
  const { user } = userData;
  const [trainingMenu, setTrainingMenu] = useState("");
  const [step, setStep] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const hundleValueChange = (e) => {
    // console.log(e.target.id);
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
    }
  };

  const postTrainingLogAction = () => {
    console.log(`${trainingMenu}, ${step}, ${reps}, ${sets}`);
  };

  return (
    <Layout title={`${user.name}さんのトレーニング記録`}>
      <h1 className="mb-10 font-bold">トレーニングを記録する</h1>
      <div className="pb-10">
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
          <option value="プッシュアップ">プッシュアップ</option>
          <option value="スクワット"> スクワット</option>
          <option value="プルアップ">プルアップ</option>
          <option value="レッグレイズ">レッグレイズ</option>
          <option value="ブリッジ">ブリッジ</option>
          <option value="ハンドスタンドプッシュアップ">
            ハンドスタンドプッシュアップ
          </option>
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
          <option value="ステップ１">ステップ</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
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
          <option value="１回">回数</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
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
          <option value="１セット">セット数</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <button
          className="bg-indigo-500  px-4 py-4 mt-10 w-full text-white"
          onClick={() => postTrainingLogAction()}
        >
          送信
        </button>
      </div>
      <div>
        <p className="p-10">
          {"ID: "}
          {user.id}
        </p>
        <p className="p-10">
          {"nickname: "}
          {user.name}
        </p>
        <p className="p-10">
          {"email: "}
          {user.email}
        </p>
        <button className="bg-gray-500 p-10" onClick={() => console.log(user)}>
          PROPS
        </button>
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

  return {
    props: { userData },
  };
}
