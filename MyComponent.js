import { useUser } from "@clerk/nextjs";

const MyComponent = () => {
  const { user } = useUser();
  return <div>Welcome, {user?.firstName}!</div>;
};

export default MyComponent;
