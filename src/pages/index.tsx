import Advantages from "@partials/index/_advantages";
import FrequestQuestion from "@partials/index/_frequent-question";
import Presentation from "@partials/index/_presentation";
import type { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "",
    },
  };
};

const Index: NextPage<{ title: string }> = (props) => {
  return (
    <div>
      <Presentation />
      <Advantages />
      <FrequestQuestion />
    </div>
  );
};

export default Index;
