import axios from "axios";
import dayjs from "dayjs";
import * as Yup from "yup";
import { mutate } from "swr";
import { useState } from "react";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import RTE from "components/Common/RTE";
import Input from "components/Common/Input";
import Label from "components/Common/Label";
import Button from "components/Common/Button";
import ImageUpload from "components/Common/ImageUpload";
import InputDatePicker from "components/Common/InputDatePicker";

import {
  InputContainer,
  ButtonContainer,
  ErrorMessage,
} from "components/Common/inputStyled";
import useCurrentUser from "hooks/useCurrentUser";
import { upload } from "util/cloudinary";
import { OB_STATUS, ONLINE_BATTLE_ITEM_COUNT } from "util/constants";

import "react-datepicker/dist/react-datepicker.css";

const OnlineBattleForm = ({ closeModal }: Props) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [details, setDetails] = useState("");

  const formSchema = Yup.object().shape({
    bgName: Yup.string().required("Boardgame Name required"),

    battleName: Yup.string()
      .min(5, "It is too short.")
      .required("Battle Name required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        bgName: "",
        battleName: "",
        details: "",
        eventStartDate: "",
        eventEndDate: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (images.length < 1) {
            toast.error("You need to upload a cover photo");
            return;
          }

          if (startDate && endDate) {
            const isStartDateSameDay = dayjs(startDate).isSame(
              new Date(),
              "day"
            );
            const isStartDateAfterToday = dayjs(startDate).isAfter(
              new Date(),
              "day"
            );
            const isEndDateAfterStartDate = dayjs(endDate).isAfter(
              dayjs(startDate),
              "day"
            );

            if (!isStartDateSameDay && !isStartDateAfterToday) {
              toast.error("Start date should be today onwards.");
              return;
            }

            if (!isEndDateAfterStartDate) {
              toast.error("End date should be after start date.");
              return;
            }
          }

          const uploadedImage = await upload(images);

          const userData = !isEmpty(user?.userData)
            ? JSON.parse(user?.userData || "")
            : { role: "" };

          const response = await axios.post("/api/online-battles/", {
            battleName: values.battleName,
            createdBy: userData._id,
            boardGameName: values.bgName,
            bgImage: uploadedImage[0],
            details,
            eventStartDate: startDate,
            eventEndDate: endDate,
            status: OB_STATUS.PENDING,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            return;
          }

          closeModal();
          resetForm();
          toast.success("New online battle added!");
          mutate(
            `/api/online-battles?first=${ONLINE_BATTLE_ITEM_COUNT}&offset=${
              1 * ONLINE_BATTLE_ITEM_COUNT
            }`
          );

          if (router.pathname === "/online-battles") {
            router.reload();
          }
        } catch (err) {
          console.error("Online battle creation error: ", err);
          toast.error("Something went wrong");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Label>
            Online Battles are joined by users to play a particular boardgame
            either in a real or online boardgame. At the end of the event, top 3
            users are awarded with trophies.
          </Label>
          <Label>
            Images from any website is prohibited. Please upload your own
            images. Make sure it's good quality too :)
          </Label>

          <ImageUpload
            buttonLabel="Upload a cover photo"
            multi
            max={1}
            passImagesToParent={(imgs) => setImages(imgs)}
          />

          <InputContainer>
            {errors.bgName && touched.bgName && (
              <ErrorMessage>{errors.bgName}</ErrorMessage>
            )}
            <Input
              name="bgName"
              label="Boardgame Name"
              error={errors.bgName || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.battleName && touched.battleName && (
              <ErrorMessage>{errors.battleName}</ErrorMessage>
            )}
            <Input
              name="battleName"
              label="Battle Name"
              error={errors.battleName || ""}
            />
          </InputContainer>

          <Label>
            Do you have any details or instructions for users to see? <br />{" "}
            (e.g, are these battles for two-player games only)
          </Label>
          <InputContainer>
            <RTE passContentToParent={setDetails} />
          </InputContainer>

          <Label>When will the Battle start?</Label>
          <InputContainer>
            <InputDatePicker passDateToParent={(val) => setStartDate(val)} />
          </InputContainer>

          <Label>When will the Battle end?</Label>
          <InputDatePicker passDateToParent={(val) => setEndDate(val)} />

          <ButtonContainer>
            <Button bg="lightYellow" type="submit">
              Submit
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </Formik>
  );
};

type Props = {
  closeModal: () => void;
};

export default OnlineBattleForm;
