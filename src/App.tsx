import { Box, Flex, Text, Title } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";

type TCameraDriver = {
  id: string;
  type: string;
  coordinates: string[];
  url: string;
};

type TViewController = {
  id: string;
  data: string[];
};

type TdataFake = {
  cameras: TCameraDriver[];
  viewControllers: TViewController[];
};

const dataFake: TdataFake = {
  cameras: [
    {
      id: "camera-1",
      type: "camera",
      coordinates: ["40.7128", "-74.0060"],
      url: "https://example.com/camera-1",
    },
    {
      id: "camera-2",
      type: "camera",
      coordinates: ["40.7128", "-74.0060"],
      url: "https://example.com/camera-2",
    },
  ],
  viewControllers: [
    {
      id: "view-controller-1",
      data: ["1", "2"],
    },
    {
      id: "view-controller-2",
      data: ["4", "5"],
    },
  ],
};

type CameraDriverProps = {
  camera: TCameraDriver;
};
const CameraDriver = ({ camera }: CameraDriverProps) => {
  return (
    <Box>
      <Text>Camera Id: {camera.id}</Text>
      <Text>Type: {camera.type}</Text>
      <Text>Coordinates: {camera.coordinates.join(", ")}</Text>
      <Text>URL: {camera.url}</Text>
    </Box>
  );
};

type ViewControllerProps = {
  viewController: TViewController;
};

const ViewController = ({ viewController }: ViewControllerProps) => {
  return (
    <Box>
      <Text>ViewController Id: {viewController.id}</Text>
      <Text>Data: {viewController.data.join(", ")}</Text>
    </Box>
  );
};

const DashboardComponent = () => {
  const [cameras, setCameras] = useState<TCameraDriver[]>([]);
  const [viewControllers, setViewControllers] = useState<TViewController[]>([]);
  // const [diskSize, setDiskSize] = useState("");
  const [isResponseLoading, setIsResponseLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/dashboard");
        const response = dataFake;
        const cameras = response.cameras;
        const viewControllers = response.viewControllers;

        setCameras(cameras);
        setViewControllers(viewControllers);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsResponseLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isResponseLoading) {
    return <div>Informacion cargando...</div>;
  }

  return (
    <Flex h="100vh" justify="center" align="center" direction="column" bg="red">
      <Title>Dashboard</Title>
      <Box bg="blue" p="md">
        {cameras.map((camera) => (
          <Fragment key={camera.id}>
            <CameraDriver camera={camera} />
          </Fragment>
        ))}
      </Box>
      <Box bg="green" p="md">
        {viewControllers.map((viewController) => (
          <Fragment key={viewController.id}>
            <ViewController viewController={viewController} />
          </Fragment>
        ))}
      </Box>
    </Flex>
  );
};

export default DashboardComponent;
