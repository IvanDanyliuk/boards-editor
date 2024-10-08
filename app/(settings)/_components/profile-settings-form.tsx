'use client';

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormState } from "react-dom";


interface IProfileSettingsForm {
  name: string;
  company: string;
  industry: string;
  role: string;
}

const emptyState = {
  name: '',
  company: '',
  industry: '',
  role: ''
}


export const ProfileSettingsForm = ({
  name,
  company,
  industry,
  role
}: IProfileSettingsForm) => {
  // const [state, formAction] = useFormState(() => {'use server'}, {
  //   name,
  //   company,
  //   industry,
  //   role
  // });

  return (
    <form action="">
      <Input name='name' value={name} />
      <Input name='company' value={company} />
      <Input name='industry' value={industry} />
      <Input name='role' value={role} />
    </form>
  );
};