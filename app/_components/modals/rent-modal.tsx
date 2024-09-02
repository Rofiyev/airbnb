"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../inputs/country-select";
import Modal from "./modal";
import Heading from "../heading";
import CategoryInput from "../inputs/category-input";
import ImageUpload from "../inputs/image-upload";
import Input from "../inputs/input";
import Counter from "../inputs/counter";
import Textarea from "../inputs/textarea";
import { categories } from "@/constants";
import { TCategory } from "@/types";
import useRentModal from "@/hooks/useRentModal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState<number>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((value: number) => value - 1);
  const onNext = () => setStep((value: number) => value + 1);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    const formattedDescription = data.description.replace(/\r\n/g, "\n");

    setIsLoading(true);

    axios
      .post("/api/listings", {
        ...data,
        description: formattedDescription,
      })
      .then(() => {
        toast.success("Listing created successfully!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((item: TCategory) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like?"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best?"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Textarea
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
          type="number"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
