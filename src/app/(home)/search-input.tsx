"use client";

import { Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParam } from "@/hooks/use-search-param";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center mr-5">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="md:text-base text-white placeholder:text-white px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65, 69, 73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-indigo-700 rounded-full h-[48px] focus-visible:ring-0 focus:bg-indigo-600"
        />
        <Button
          type="submit"
          variant="none"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <Search className="text-indigo-700" />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant="none"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <X className="text-indigo-700" />
          </Button>
        )}
      </form>
    </div>
  );
};
