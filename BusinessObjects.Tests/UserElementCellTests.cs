﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessObjects.Tests
{
    [TestClass]
    public class UserElementCellTests
    {
        [TestMethod]
        public void NewUserElementCell_ShouldCreate()
        {
            var newUser = new User("Email");
            
            var newElement = new ResourcePool("CMRP")
                .AddElement("Element");

            var newField = newElement.AddField("Field", ElementFieldTypes.Integer, false);

            newElement
                .AddItem("Item")
                .AddCell(newField)
                .SetValue(0, newUser);
        }
    }
}