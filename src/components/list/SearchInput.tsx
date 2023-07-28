'use client';

import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import { Box, Input } from "@mui/material";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchInput: React.FC<Props> = ({ onChange }) => {

  return (
    <StyledBox>
      <Search />
      <StyledInput placeholder='Search' disableUnderline onChange={onChange} />
    </StyledBox>
  );
}

const StyledBox = styled(Box)`
  width: 250px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 11px;
  border: solid 1px #b1b1b1;
  &:hover {
    border: solid 1px #000000;
  }
`

const StyledInput = styled(Input)`
  & input {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;
  }
`

export default SearchInput;