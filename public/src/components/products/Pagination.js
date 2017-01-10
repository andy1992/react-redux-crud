import React from 'react';
import { Link } from 'react-router';

class Pagination extends React.Component
{
    render() {
        // calculate number of pages depending on the total of records and the
        // "products per page" property
        let pagesAmount = Math.ceil(this.props.productsAmount / this.props.productsPerPage);
        let itemPerPage = this.props.productsPerPage;
        let orderBy = this.props.orderBy;
        let orderType = this.props.orderType;
        let search = this.props.search;
        let appendUrl = '&search=' + search + '&order_by=' + orderBy + '&order_type=' + orderType + '&item_per_page=' + itemPerPage;

        // creating page elements, one for each page
        let pageIndicators = [];
        for (let i=1; i <= pagesAmount; i++) {
            pageIndicators.push(
                <li className={i == this.props.currentPage ? "active":""} key={i}>
                    <Link to={'?page=' + i + appendUrl} onClick={this.props.selectAllProducts} >{i}</Link>
                </li>
            )
        }

        // return paging buttons and 'go to page' form
        return (
            !this.props.productsAmount ? null :
                <nav className='overflow-hidden' style={{marginBottom:'20px'}}>
                    {
                        (pagesAmount - 1) <= 0 ? null :
                            <ul className='pagination pull-left margin-zero'>
                                {
                                    this.props.currentPage == 1 ? null :
                                        <li>
                                            <a href={'/?page=1' + appendUrl} onClick={this.props.onPageChanged.bind(null,1)}>
                                                <span style={{marginRight: '0 .5em'}}>&laquo;</span>
                                            </a>
                                        </li>
                                }

                                {
                                    this.props.currentPage == 1 ? null :
                                        <li>
                                            <a href={'/?page='+ (this.props.currentPage - 1) + appendUrl} onClick={this.props.onPageChanged.bind(null,1)}>
                                                <span style={{marginRight: '0 .5em'}}>&lsaquo;</span>
                                            </a>
                                        </li>
                                }

                                { pageIndicators }

                                {
                                    this.props.currentPage == pagesAmount ? null :
                                        <li>
                                            <a href={'/?page='+ (parseInt(this.props.currentPage) + 1) + appendUrl} onClick={this.props.onPageChanged.bind(null, pagesAmount)}>
                                                <span style={{marginRight: '0 .5em'}}>&rsaquo;</span>
                                            </a>
                                        </li>
                                }

                                {
                                    this.props.currentPage == pagesAmount ? null :
                                        <li>
                                            <a href={'/?page=' + pagesAmount + appendUrl} onClick={this.props.onPageChanged.bind(null, pagesAmount)}>
                                                <span style={{marginRight: '0 .5em'}}>&raquo;</span>
                                            </a>
                                        </li>
                                }
                            </ul>
                    }

                    <form method="get" action="#">
                        <div className="input-group col-md-2 pull-right">
                            <input type="hidden" name="s" value="" />
                            <input type="number"
                                   className="form-control"
                                   name="page"
                                   min='1'
                                   max={pagesAmount}
                                   required
                                   placeholder='Go to page'
                                   onChange={this.props.onInputPageChange} />

                            <div className="input-group-btn">
                                <button className="btn btn-primary" onClick={this.props.goToInputPage}>
                                    Go
                                </button>
                            </div>
                        </div>

                        <div className="input-group col-md-3 pull-right" style={{marginRight:'10px'}}>
                            <select value={this.props.productsPerPage} name="" className="form-control" onChange={this.props.itemPerPageChanged}>
                                <option value="5">Show 5 Products per page</option>
                                <option value="10">Show 10 Products per page</option>
                                <option value="25">Show 25 Products per page</option>
                            </select>
                        </div>
                    </form>
                </nav>
        );
    }
}

export default Pagination;