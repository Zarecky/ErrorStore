using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ErrorStore.Controllers.Requests;
using ErrorStore.Controllers.Responses;
using ErrorStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ErrorStore.Controllers
{
    public class ErrorsController : Controller
    {
        private ErrorStoreContext db;

        public ErrorsController(ErrorStoreContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<ErrorPreviewResponse>>> Get()
        {
            var errors = await db.Errors.ToListAsync();
            var errorsResponse = new List<ErrorPreviewResponse>();
            errors.ForEach(error =>
            {
                errorsResponse.Add(new ErrorPreviewResponse
                {
                    Id = error.Id,
                    CreateDate = error.CreateDate,
                    ShortDescription = error.ShortDescription,
                    State = error.State,
                    Urgency = error.Urgency,
                    Criticality = error.Criticality
                });
            });
            return errorsResponse;
        }
        
        [HttpGet("api/[controller]/[action]/{id}")]
        public async Task<ActionResult<ErrorResponse>> Get([FromRoute] int id)
        {
            Console.WriteLine(Request.Headers);
            var error = await db.Errors.FindAsync(id);

            if (error == null) return NotFound("There is no error");
            
            var errorHistoryList = await db.ErrorHistory
                .Where(i => i.ErrorId == id)
                .OrderBy(i => i.Date)
                .ToListAsync();
            
            var historyResponse = new List<ErrorHistoryResponse>();
            
            errorHistoryList.ForEach(async item =>
            {
                var user = await db.Users.FindAsync(item.UserId);
                    
                historyResponse.Add(new ErrorHistoryResponse
                {
                    Id = item.Id,
                    Date = item.Date,
                    Action = item.Action,
                    Comment = item.Comment,
                    User = new UserResponse
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Surname = user.Surname
                    }
                });
            });

            var response = new ErrorResponse
            {
                Id = error.Id,
                CreateDate = error.CreateDate,
                ShortDescription = error.ShortDescription,
                Description = error.Description,
                State = error.State,
                Urgency = error.Urgency,
                Criticality = error.Criticality,
                History = historyResponse
            };

            return response;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ErrorPreviewResponse>> Create([FromBody] NewErrorRequest request)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == User.Identity.Name);
            var error = new Error
            {
                CreateDate = DateTime.Now,
                ShortDescription = request.ShortDescription,
                Description = request.Description,
                State = Error.StateEnum.New,
                Urgency = request.Urgency,
                Criticality = request.Criticality
            };

            db.Errors.Add(error);
            
            await db.SaveChangesAsync();

            var firstHistoryItem = new ErrorHistory
            {
                Date = DateTime.Now,
                Action = ErrorHistory.ActionEnum.Input,
                Comment = "Init",
                UserId = user.Id,
                ErrorId = error.Id
            };

            db.ErrorHistory.Add(firstHistoryItem);
            
            await db.SaveChangesAsync();

            return new ErrorPreviewResponse
            {
                Id = error.Id,
                CreateDate = error.CreateDate,
                ShortDescription = error.ShortDescription,
                State = error.State,
                Urgency = error.Urgency,
                Criticality = error.Criticality
            };
        }
        
        [HttpPut("api/[controller]/[action]/{id}")]
        [Authorize]
        public async Task<ActionResult<ErrorHistoryResponse>> Update(int id, [FromBody] ErrorHistoryItemRequest request)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == User.Identity.Name);
            var error = await db.Errors.FindAsync(id);

            if (error == null)
            {
                return BadRequest("The is no error");
            }

            if (error.State >= (Error.StateEnum) request.Action)
            {
                return BadRequest($"State '{(Error.StateEnum)request.Action}' cannot become after '{error.State}'");
            }

            var historyItem = new ErrorHistory
            {
                Date = DateTime.Now,
                Action = request.Action,
                Comment = request.Comment,
                UserId = user.Id,
                ErrorId = id
            };

            error.State = (Error.StateEnum) historyItem.Action;

            db.ErrorHistory.Add(historyItem);
            db.Update(error);
            
            await db.SaveChangesAsync();

            return new ErrorHistoryResponse
            {
                Id = historyItem.Id,
                Date = historyItem.Date,
                Action = historyItem.Action,
                Comment = historyItem.Comment,
                User = new UserResponse
                {
                    Name = user.Name,
                    Surname = user.Surname
                }
            };
        }
    }
}