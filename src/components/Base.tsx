import Nav from "./Nav";

interface Props {
  children: React.ReactNode;
}

const Base = ({ children }: Props) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Base;
