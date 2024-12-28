import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { HiOutlineHome } from "react-icons/hi2";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";
import { BiBook, BiCategoryAlt } from "react-icons/bi";
import { FaWizardsOfTheCoast } from "react-icons/fa6";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const DashboardLayout: React.FC<LayoutProps> = ({
  children
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [expanded, isExpanded] = useState(false);

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      window.location.replace('/login');
  }},[])

  const sidebarItems = [
    {
      id: 1,
      title: "داشبـــورد",
      link: "/",
      icon: <HiOutlineHome size={23} color={theme.palette.common.white} />,
    },
    {
      id: 2,
      title: "دسته بندی ها",
      link: "/categories",
      icon: <BiCategoryAlt size={23} color={theme.palette.common.white} />,
    },
    {
      id: 3,
      title: "نویسنده ها",
      link: "/authors",
      icon: (
        <FaWizardsOfTheCoast size={23} color={theme.palette.common.white} />
      ),
    },
    {
      id: 4,
      title: "کتاب ها",
      link: "/books",
      icon: (
        <BiBook size={23} color={theme.palette.common.white} />
      ),
    },
    {
      id: 5,
      title: "امانت ها",
      link: "/borrowedBooks",
      icon: (
        <BiBook size={23} color={theme.palette.common.white} />
      ),
    },
  ];

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        minHeight: "100vh",
        transition: "all .3s",
      }}
    >
      <Fade>
        <Container maxWidth="xl">
          <Sidebar
            expanded={expanded}
            isExpanded={isExpanded}
            sidebarItems={sidebarItems}
            location={location}
          />

          <Box
            sx={{
              position: "relative",
              padding: isMobile ? "20px 5px" : "20px",
              marginRight: isMobile ? 0 : expanded ? "205px" : "85px",
              transition: "all .3s",
            }}
          >
            <Header
              expanded={expanded}
              isExpanded={isExpanded}
              sidebarItems={sidebarItems}
              location={location}
            />
            <Box sx={{ padding: "1rem 0" }}>{children}</Box>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
};

export default DashboardLayout;
