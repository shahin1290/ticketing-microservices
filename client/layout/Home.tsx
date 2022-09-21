import { AppShell, Navbar, Header, Box } from "@mantine/core";
import Image from "next/image";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 30 }} height={500} p="xs">
          Side items
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Box>
            <Box>
              <Image src="/logo.png" alt="logo" width="100px" height="40px" />
            </Box>
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default HomePageLayout