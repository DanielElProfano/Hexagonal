export const HttpResponse =  {
    success: function(statusCode: number, body: any) {
        return {
            error: false,
            statusCode,
            body
        }
    },
    error: (statusCode: number, body: any) => {
        return {
            error: true,
            statusCode,
            body
        }
    }
    
}