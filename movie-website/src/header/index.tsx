const Header = () => {
  return (
    <header className="bg-[#E0230D] shadow-md shadow-[#E0531D] text-white flex items-center justify-between h-18">
      <h1 className="p-6 text-xl">JWMovies</h1>
      <NavigationOptions options={["Home"]} />
    </header>
  );
};

interface NavigationOptionsProps {
  options: string[];
};

const NavigationOptions = ({options}: NavigationOptionsProps) => {
  return(
    <nav>
      {options.map((option, index) => <a className="p-6 text-lg" href="#" key={index}>{option}</a>)}
    </nav>
  );
};

export { Header };
