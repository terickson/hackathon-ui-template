function pagerService() {
    function previousPage() {
        if (this.$pagerOptions.currentPage > 1) {
            this.$pagerOptions.currentPage--;
        }
    }

    function nextPage() {
        if (this.$pagerOptions.currentPage < this.$pageCount()) {
          this.$pagerOptions.currentPage++;
        }
    }

    function onFirstPage() {
        return this.$pagerOptions.currentPage === 1;
    }

    function pageCount() {
        if( this.$filtered) {
            this.$pagerOptions.count = this.$filtered.length;
        }
        return (this.$pagerOptions.count && this.$pagerOptions.itemsPerPage) ? Math.ceil(this.$pagerOptions.count/this.$pagerOptions.itemsPerPage) : 0;
    }

    function resetPage() {
        this.$pagerOptions.currentPage = 1;
    }

    function onLastPage() {
        return this.$pagerOptions.currentPage === this.$pageCount();
    }

    function offset() {
        return this.$pagerOptions.itemsPerPage ? ((this.$pagerOptions.currentPage - 1) * this.$pagerOptions.itemsPerPage) : undefined;
    }

    function limit() {
        return this.$pagerOptions.itemsPerPage ? this.$pagerOptions.itemsPerPage : undefined;
    }


    function decorate(list, options) {
        list.$pagerOptions = options;
        list.$previousPage = previousPage;
        list.$nextPage = nextPage;
        list.$onFirstPage = onFirstPage;
        list.$pageCount = pageCount;
        list.$onLastPage = onLastPage;
        list.$resetPage = resetPage;
        list.$offset = offset;
        list.$limit = limit;
        return list;
    }

    return {
        decorate: decorate
    };
}

appModule.factory('pagerService', pagerService);

