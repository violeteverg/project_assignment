import { Navbar } from "@/app/components/organism";
import { MyExpensesPage } from "@/app/components/pages";

const page: React.FC = () => {
  return (
    <Navbar navbarStyle='sticky'>
      <MyExpensesPage />
    </Navbar>
  );
};

export default page;
