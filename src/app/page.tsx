// components
import Heading from "@/components/home/Heading";
// import FloatingIcons from "@/components/home/FloatingIcons/FloatingIcons";
import Premium from "@/components/home/Premium";
import {
  DiscoverJobRolesLarge,
  DiscoverJobRolesSmall,
} from "@/components/home/DiscoverJobRoles";
import FAQs from "@/components/home/FAQs";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-88px)] w-full flex flex-col items-center justify-center mb-[2rem]">
      <div className="relative h-fit w-full flex flex-col items-center justify-center px-4 bg-[rgb(124,58,237,0.9)] text-white overflow-hidden">
        <Heading />
        {/* <FloatingIcons /> */}
      </div>
      <Premium />
      <DiscoverJobRolesLarge />
      <DiscoverJobRolesSmall />
      <FAQs />
    </div>
  );
}
