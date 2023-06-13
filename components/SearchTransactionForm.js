import React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SearchTransactionForm = ({ handleFormSubmit, cluster, address, loading, setCluster, setAddress, errorMessage }) => {
    return (
      <form onSubmit={handleFormSubmit} className="flex flex-wrap w-full">
        <FormControl variant="standard" style={{ width: "300px", marginTop:"30px", marginBottom: "30px" }}>
          <InputLabel
            style={{ color: "#171717", backgroundColor: "transparent", fontFamily: "fantasy" }}
          >
            ⛓ Please Select Network/Cluster
          </InputLabel>
          <Select
            id="network-select"
            value={cluster}
            defaultValue="devnet-mln"
            label="select network *"
            onChange={(event) => setCluster(event.target.value)}
          >
            <MenuItem value={"devnet-mln"}>Devnet</MenuItem>
            <MenuItem disabled value={"testnet-mln"}>Testnet</MenuItem>
            <MenuItem disabled value={"mainnet-mln"}>Mainnet</MenuItem>
          </Select>
        </FormControl>
        <label htmlFor="address" className="w-full shrink-0 text-lg mb-2">
          Transaction address
        </label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="w-3/4 border-2 border-r-0 border-gray-500 h-12 rounded-l-lg px-4 focus:outline-none focus:border-blue-600 disabled:bg-gray-500 transition-colors duration-150"
          placeholder="CHrNmjoRzaGCL..."
          disabled={loading}
          required
        />
        {/* <button
                type='submit'
                disabled={loading}
                className='flex-grow bg-blue-600 flex items-center justify-center rounded-r-lg text-white text-sm hover:bg-blue-900 disabled:bg-gray-500 transition-colors duration-150'
            >
                Search
            </button> */}

        <Button
          type="submit"
          disabled={loading}
          className="flex-grow bg-blue-600 flex items-center justify-center rounded-r-lg text-white text-sm hover:bg-blue-900 disabled:bg-gray-500 transition-colors duration-150"
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

        {errorMessage && (
          <p className="text-red-600 text-base my-1">{errorMessage}</p>
        )}
      </form>
    );
};

export default SearchTransactionForm;
