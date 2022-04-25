class apiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    search(){
        // console.log(this.query);
        // console.log(this.queryString);
        const keyword = this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword,
                $options: 'i',
                
            }
        }:{}
        this.query = this.query.find({...keyword})
        return this
    }
    filter(){
        let queryCopy = {...this.queryString}
        console.log(queryCopy);
        const removeFields = ["keyword", "page", "limit","category"]

        removeFields.forEach(key=>delete queryCopy[key])
        // console.log(queryCopy);

        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    } 
    pagination(resultPerPage){
        const curentPage = Number(this.queryString.page) || 1
        const skip = resultPerPage*(curentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

module.exports = apiFeatures;