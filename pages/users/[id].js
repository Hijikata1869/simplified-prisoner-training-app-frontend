import { useRouter } from "next/router";

import Layout from "../../components/Layout";

export default function UserTrainingLog() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="トレーニング記録">
      <div>{`ユーザー${id}のトレーニング記録及び表示ページです`}</div>
    </Layout>
  );
}
