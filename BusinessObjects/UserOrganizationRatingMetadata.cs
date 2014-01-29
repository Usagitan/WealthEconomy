//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BusinessObjects
{
    using System;
    using System.ComponentModel.DataAnnotations;
    
    public class UserOrganizationRatingMetadata
    {
        [Display(Name = "Id")]
        public int Id { get; set; }
    
        [Display(Name = "UserId")]
        public int UserId { get; set; }
    
        [Display(Name = "OrganizationId")]
        public int OrganizationId { get; set; }
    
        [Display(Name = "Quality Rating")]
        public decimal QualityRating { get; set; }
    
        [Display(Name = "Employee Satisfaction Rating")]
        public decimal EmployeeSatisfactionRating { get; set; }

        [Display(Name = "Customer Satisfaction Rating")]
        public decimal CustomerSatisfactionRating { get; set; }

        [Display(Name = "CreatedOn")]
        public System.DateTime CreatedOn { get; set; }
    
        [Display(Name = "ModifiedOn")]
        public System.DateTime ModifiedOn { get; set; }
    
        [Display(Name = "DeletedOn")]
        public Nullable<System.DateTime> DeletedOn { get; set; }
    
    }
}
