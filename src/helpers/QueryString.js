import { DEFAULT_ITEM_PER_PAGE, DEFAULT_ORDER_BY, DEFAULT_ORDER_TYPE, DEFAULT_PAGE, DEFAULT_SEARCH } from './Pagination';

export function parseQueryString(parameters = {})
{
    let queryString = '?';
    const itemPerPage = (parameters.item_per_page != null) ? parameters.item_per_page : DEFAULT_ITEM_PER_PAGE;

    queryString += 'item_per_page=' + itemPerPage + '&';

    const orderBy = (parameters.order_by != null) ? parameters.order_by : DEFAULT_ORDER_BY;
    queryString += 'order_by=' + orderBy + '&';

    const orderType = (parameters.order_type != null) ? parameters.order_type : DEFAULT_ORDER_TYPE;
    queryString += 'order_type=' + orderType + '&';

    const search = (parameters.search != null) ? parameters.search : DEFAULT_SEARCH;
    queryString += 'name=' + search + '&';

    const page = (parameters.page != null) ? parameters.page : DEFAULT_PAGE;
    queryString += 'page=' + page + '&';

    queryString = queryString.substr(0, queryString.length - 1);
    return queryString;
}