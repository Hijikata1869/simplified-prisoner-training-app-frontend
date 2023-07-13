import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { fetchUser, getAllUserIds } from "../../lib/users";

import Layout from "../../components/Layout";

export default function UserTrainingLogs({ userData }) {
  const router = useRouter();
  const { id } = router.query;
  const { user } = userData;

  return (
    <Layout title={`${user.name}さんのトレーニング記録`}>
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
