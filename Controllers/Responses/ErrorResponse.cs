using System;
using System.Collections.Generic;
using ErrorStore.Models;

namespace ErrorStore.Controllers.Responses
{
    public class ErrorResponse
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public Error.StateEnum State { get; set; }
        public Error.UrgencyEnum Urgency { get; set; }
        public Error.CriticalityEnum Criticality { get; set; }
        public List<ErrorHistoryResponse> History { get; set; }
    }
}