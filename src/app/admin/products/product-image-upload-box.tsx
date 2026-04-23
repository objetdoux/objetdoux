"use client";

import { useActionState, useState } from "react";
import {
  ProductImageUploadState,
  uploadProductImage,
} from "./actions";

const initialState: ProductImageUploadState = {
  status: "idle",
  message: "",
};

export function ProductImageUploadBox({
  title,
  description,
  sizeGuide,
  ratio,
  imageType,
  productSlug,
  productId,
}: {
  title: string;
  description: string;
  sizeGuide: string;
  ratio: string;
  imageType: "thumbnail" | "gallery" | "detail";
  productSlug: string;
  productId?: string;
}) {
  const [state, action, pending] = useActionState(uploadProductImage, initialState);
  const [previewUrl, setPreviewUrl] = useState("");
  const statusColor =
    state.status === "success"
      ? "text-green-700"
      : state.status === "error"
        ? "text-red-600"
        : "text-stone-500";

  return (
    <form
      action={action}
      className="rounded-[1.25rem] border border-dashed border-black/12 bg-[#faf8f5] p-4"
    >
      <input type="hidden" name="imageType" value={imageType} />
      <input type="hidden" name="productSlug" value={productSlug} />
      <input type="hidden" name="productId" value={productId ?? ""} />

      <div className={`${ratio} overflow-hidden rounded-xl bg-[#dedbd5]`}>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <p className="text-sm font-semibold text-stone-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">{description}</p>
          <p className="mt-1 text-xs font-medium leading-5 text-stone-700">
            권장 사이즈: {sizeGuide}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="inline-flex h-10 cursor-pointer items-center rounded-xl border border-black/8 px-4 text-xs font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-950">
            이미지 선택
            <input
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={!productId}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                setPreviewUrl(file ? URL.createObjectURL(file) : "");
              }}
            />
          </label>
          <button
            type="submit"
            disabled={pending || !productId}
            className="inline-flex h-10 items-center rounded-xl bg-stone-950 px-4 text-xs font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "업로드 중" : "업로드"}
          </button>
        </div>

        {state.message ? (
          <p className={`text-xs leading-5 ${statusColor}`}>{state.message}</p>
        ) : null}
        {!productId ? (
          <p className="text-xs leading-5 text-stone-500">
            상품 등록 후 이미지 업로드가 가능합니다.
          </p>
        ) : null}
        {state.path ? (
          <p className="break-all text-[11px] leading-5 text-stone-500">
            {state.path}
          </p>
        ) : null}
      </div>
    </form>
  );
}
