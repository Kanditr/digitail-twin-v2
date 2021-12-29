import { useAppContext } from "../components/context/user";

const Context = () => {
  const { balance, profile } = useAppContext();

  return (
    <>
      {/* <div>{a}</div> */}
      <div>{balance}</div>
      <div>{profile.profile_username}</div>
    </>
  );
};

export default Context;
