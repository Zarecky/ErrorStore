using System;
using ErrorStore.Models;

namespace ErrorStore.Controllers.Requests
{
    public class NewErrorRequest
    {
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public Error.UrgencyEnum Urgency { get; set; }
        public Error.CriticalityEnum Criticality { get; set; }
    }
}