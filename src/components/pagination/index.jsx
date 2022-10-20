import { Pagination as MuiPagination, PaginationItem, Stack } from '@mui/material/';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ pagination }) => (
  <Stack spacing={2} direction="row" justifyContent="center" mt={4} mb={4}>
    <MuiPagination
      page={pagination.current_page}
      count={pagination.last_page}
      renderItem={(item) => (
        <PaginationItem
          to={`${item.page === 1 ? '' : `${item.page}`}`}
          component={Link}
          {...item}
        />
      )}
    />
  </Stack>
);

Pagination.propTypes = {
  pagination: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Pagination;
