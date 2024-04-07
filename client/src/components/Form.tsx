import { FC, MouseEventHandler, useState } from "react";
import  Input, {Props as InputProps}  from "./Input";
import {
  Box,
  Button,
  Flex,
  Text,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export type InputItem = Omit<InputProps, "onChange" | "value">;

type Props = {
  title: string;
  inputs: InputItem[];
  submit: (formData: unknown) => void;
  initState: Record<string, string>;
  cta: string;
  link: string;
  linkPrompt: string;
  linkText: string;
  loading: boolean;
};

export const Form: FC<Props> = ({
  inputs,
  submit,
  initState,
  cta,
  link,
  linkPrompt,
  linkText,
  loading,
}) => {
  const [formData, setFormData] = useState(initState);

const validate = () => {
    return Object.values(formData).every((value) => value)
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(!validate()) {
        alert("Please fill out all fields")
        return
    }
    submit(formData);
    setFormData(initState);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"flex-start"}
      justify={"center"}
      mt={8}
      bg={useColorModeValue("beige.50", "beige.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {inputs.map((input, idx) => (
              <Input
                key={idx}
                {...input}
                value={formData[input.name]}
                onChange={handleChange}
              />
            ))}
            <Button
              isLoading={loading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              {cta}
            </Button>
          </Stack>
        </Box>
        <Stack pt={6}>
          <Text align={"center"}>
            {linkPrompt}{" "}
            <Link href={link} color={"blue.400"}>
              {linkText}
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};
