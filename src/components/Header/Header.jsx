import logo from "../../assets/icons/logo.svg";

const Header = () => {
  return (
    <header className="bg-white h-16 flex items-center px-4">
      <img src={logo} alt="Logo" className="h-8 ml-6" />
    </header>
  );
};

export default Header;
