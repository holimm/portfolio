"use client";
import {
  forwardRef,
  InputHTMLAttributes,
  useMemo,
  type HTMLAttributes,
} from "react";

import { useInput, type UseInputProps } from "../utils/useInput";
import { Status } from "../types/input.types";
import { Text } from "../../typography";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { isEmpty } from "lodash";
import { Flex } from "@/components/layout/flex";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeVariants } from "@/config/animations";
import { Icon } from "../../icon";
import { InfoIcon } from "../../icon/icons";

export interface InputData {}

export interface InputOptions extends UseInputProps {
  state?: Status;
  label?: string;
  register?: UseFormRegisterReturn<any>;
  errors?: FieldErrors<any>;
}

export interface InputProps
  extends InputOptions,
    Omit<InputHTMLAttributes<HTMLInputElement>, keyof UseInputProps>,
    InputData {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, type, label, register, errors, ...props }, ref) => {
    const { ...context } = useInput({ ref, ...props });

    const ctx = useMemo(() => context, [context]);
    const Component = "input";

    const isHavingError = useMemo(
      () => errors && !isEmpty(errors[register?.name || props.id]),
      [errors, register, props.id],
    );

    return (
      <AnimatePresence>
        <label htmlFor={props.name}>
          <Flex layout="col" gap="2xs">
            <Flex gap="2xs">
              {isHavingError && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants()}
                >
                  <Text ashtml="paragraph" color="error" contrast="medium">
                    *
                  </Text>
                </motion.div>
              )}
              <Text size="sm" ashtml="paragraph">
                {label}
              </Text>
            </Flex>
            <Component
              type={type}
              ref={ctx.inputRef}
              id={register?.name || props.id}
              data-comp="input"
              data-variant={ctx.variant}
              disabled={state === Status.Disable}
              className={`duration-400 transition-all ${className} ${ctx.inputStyle()} ${isHavingError && "!border-b-error"}`}
              placeholder={props.placeholder}
              {...register}
            />
            <ErrorMessage
              errors={errors}
              name={register?.name}
              render={({ messages, message }) =>
                messages && Array.isArray(messages) ? (
                  Object.entries(messages).map(([type, message]) => (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeVariants()}
                      key={type}
                    >
                      <Flex className="mt-xs" gap="2xs" align="start">
                        <Icon size="sm" color="error" icon={<InfoIcon />} />
                        <Text
                          size="sm"
                          weight="light"
                          color="error"
                          contrast="medium"
                        >
                          {message}
                        </Text>
                      </Flex>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants()}
                    key={type}
                  >
                    <Flex className="mt-xs" gap="2xs" align="start">
                      <Icon
                        className="mt-[2px]"
                        size="sm"
                        color="error"
                        icon={<InfoIcon />}
                      />
                      <Text
                        size="sm"
                        weight="light"
                        color="error"
                        contrast="medium"
                      >
                        {message}
                      </Text>
                    </Flex>
                  </motion.div>
                )
              }
            />
          </Flex>
        </label>
      </AnimatePresence>
    );
  },
);

Input.displayName = "Input";
